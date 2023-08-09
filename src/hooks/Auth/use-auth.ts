import { useCallback, useEffect, useReducer } from 'react'

import { isClient } from '@/utils'
import authReducer from './authReducer'

import { Status, UserObject } from '@/pages/api/data/types/index.modal'
import { Auth } from './types/Auth.modal'
import { Events } from '../Events/types/Events.modal'

export default function useAuth(): Auth {
	const [authState, dispatch] = useReducer(authReducer.reducer, authReducer.initialState)

	const setUserData = useCallback(function (data: UserObject): Status {
		// Updates auth state user data
		dispatch({ type: 'SET_USER', user: data })

		// Updates user's events
		getEvents().catch(() => {})

		// Disables loading and removes any errors
		setLoading(false)
		setError()
		return { code: 'auth/logged-in' }
	}, [])
	const errorHandler = useCallback(
		async <ResponseData>(response: Response, errorFunction?: (data: ResponseData) => boolean): Promise<ResponseData> => {
			const data: ResponseData = await response.json()
			return new Promise((resolve, reject) => {
				// Returns error if response failed or `errorFunction` returns true
				if (!response.ok || (errorFunction && errorFunction(data))) {
					const error: any = data
					// Sets and returns error and disables loading state
					setError(error)
					setLoading(false)
					reject(error)
				} else {
					resolve(data)
				}
			})
		},
		[]
	)
	function login(email: string, password: string): Promise<Status> {
		return new Promise(async (resolve, reject: (error: Status) => void) => {
			// Checks if user is logged in. If yes then resolves
			if (authState.state.isLoggedIn) return resolve({ code: 'auth/already-logged-in' })
			setLoading(true)

			const response = await fetch('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					email: email,
					password: password
				})
			})

			errorHandler<UserObject>(response)
				.then((data) => resolve(setUserData(data)))
				.catch((error) => reject(error))
		})
	}
	const loginUsingToken = useCallback(
		function (): Promise<Status> {
			return new Promise(async (resolve, reject) => {
				// Checks if user is logged in. If yes then resolves
				if (authState.state.isLoggedIn) return resolve({ code: 'auth/already-logged-in' })
				setLoading(true)

				const response = await fetch('/api/auth/login-token')

				errorHandler<UserObject>(response)
					.then((data: any) => resolve(setUserData(data)))
					.catch((error) => reject(error))
			})
		},
		[authState.state.isLoggedIn, errorHandler, setUserData]
	)

	function register(email: string, password: string, name: string): Promise<Status> {
		return new Promise(async (resolve, reject) => {
			setLoading(true)

			const response = await fetch('/api/auth/register', {
				method: 'POST',
				body: JSON.stringify({
					email: email,
					password: password,
					name: name
				})
			})

			errorHandler<Status>(response, (status) => !status.code.includes('created'))
				.then((status) => {
					setLoading(false)
					resolve(status)
				})
				.catch((error) => reject(error))
		})
	}

	function logout(): Promise<Status> {
		return new Promise(async (resolve, reject) => {
			// Checks if user is logged in. If no then resolves
			if (!authState.state.isLoggedIn) resolve({ code: 'auth/not-logged-in' })
			const response = await fetch('/api/auth/logout')
			dispatch({ type: 'LOG_OUT' })

			errorHandler(response)
				.then((data: any) => resolve(data))
				.catch((error) => reject(error))
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
		logout,
		getEvents
	}
}

export const exampleAuthObject: Auth = {
	...authReducer.initialState,
	login: () => new Promise(() => ''),
	register: () => new Promise(() => {}),
	loginUsingToken: () => {},
	logout: () => new Promise(() => {}),
	getEvents: () => new Promise(() => {})
}
