import { useCallback, useEffect, useReducer } from 'react'

import { isClient } from '@/utils'
import { Auth } from './Auth.modal'
import { Events } from '../Events.modal'
import { Status, UserObject } from '@/pages/api/auth'
import authReducer from './authReducer'

export default function useAuth(): Auth {
	const [authState, dispatch] = useReducer(authReducer.reducer, authReducer.initialState)

	function login(login: string, password: string): Promise<any> {
		return new Promise(async (resolve, reject: (error: Status) => void) => {
			setLoading(true)

			const response = await fetch('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					login: login,
					password: password
				})
			})
			if (!response.ok) {
				const error: Status = await response.json()

				setError(error)
				setLoading(false)
				reject(error)
				return
			}

			resolve(await setUserData(response))
		})
	}
	const setUserData = useCallback(async function (response: Response) {
		const data: UserObject = await response.json()

		dispatch({ type: 'SET_USER', user: data })

		getEvents().catch(() => {})

		setLoading(false)
		setError()
		return data
	}, [])
	const loginUsingToken = useCallback(
		function () {
			return new Promise(async (resolve, reject) => {
				setLoading(true)

				const response = await fetch('/api/auth/login-token', {
					method: 'POST'
				})

				if (!response.ok) {
					const error = await response.json()

					setError(error)
					setLoading(false)
					reject(error)
					return
				}

				resolve(await setUserData(response))
			})
		},
		[setUserData]
	)

	function register(login: string, password: string, name: string): Promise<Status> {
		return new Promise(async (resolve, reject) => {
			setLoading(true)

			const response = await fetch('/api/auth/register', {
				method: 'POST',
				body: JSON.stringify({
					login: login,
					password: password,
					name: name
				})
			})

			if (!response.ok) {
				const error = await response.json()

				setError(error)
				setLoading(false)
				reject(error)
				return
			}

			const status: Status = await response.json()

			let result = resolve
			if (!status.ok) {
				result = reject
			}
			setLoading(false)

			result(status)
		})
	}

	function logout(): Promise<Status> {
		return new Promise(async (resolve, reject) => {
			dispatch({ type: 'LOG_OUT' })
			const response = await fetch('/api/auth/logout')

			let result = resolve

			if (!response.ok) {
				result = reject
			}
			const status: Status = await response.json()
			result(status)
		})
	}

	function getEvents(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch('/api/user/events')

			if (!response.ok) {
				const error = await response.json()
				reject(error)
				return
			}
			const data: Events = await response.json()

			dispatch({ type: 'SET_EVENTS', events: data })
			resolve()
		})
	}
	function setError(error?: Status) {
		dispatch({ type: 'SET_ERROR', errorMessage: error?.code })
	}
	function setLoading(state: boolean) {
		dispatch({ type: 'SET_LOADING', state })
	}

	useEffect(() => {
		if (isClient()) {
			loginUsingToken().catch((error) => {})
		}
	}, [loginUsingToken])

	return {
		...authState,
		login,
		register,
		loginUsingToken,
		logout
	}
}

export const exampleAuthObject: Auth = {
	...authReducer.initialState,
	login: () => new Promise(() => ''),
	register: () => new Promise(() => {}),
	loginUsingToken: () => {},
	logout: () => new Promise(() => {})
}
