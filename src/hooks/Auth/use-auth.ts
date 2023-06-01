import { useCallback, useEffect, useReducer } from 'react'

import { getLocalStorage, isClient } from '@/utils'
import { Auth } from './Auth.modal'
import { Events } from '../Events.modal'
import authReducer from './authReducer'

export default function useAuth(): Auth {
	const [authState, dispatch] = useReducer(authReducer.reducer, authReducer.initialState)

	function login(login: string, password: string) {
		return new Promise((resolve, reject) => {
			setLoading(true)

			fetch('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					login: login,
					password: password
				})
			})
				.then(responseHandler)
				.then((data: { token: string }) => {
					setError()
					dispatch({ type: 'SET_TOKEN', token: data.token })
					resolve(data.token)
				})
				.catch((error: Error) => {
					setError(error)
					reject(error.message)
				})
				.finally(() => {
					setLoading(false)
				})
		})
	}
	const loginUsingToken = useCallback(function (token: string) {
		setLoading(true)

		return new Promise((resolve, reject) => {
			fetch('/api/auth/login-token', {
				method: 'POST',
				body: JSON.stringify({
					token: token
				})
			})
				.then(responseHandler)
				.then((data) => {
					setError()
					dispatch({ type: 'SET_USER', user: data.user, id: data.userId })
					resolve(data.user)
				})
				.catch((error: Error) => {
					setError(error)
					reject(error.message)
				})
				.finally(() => {
					setLoading(false)
				})
		})
	}, [])

	function register(login: string, password: string, name: string): Promise<any> {
		setLoading(true)

		return new Promise((resolve, reject) => {
			fetch('/api/auth/register', {
				method: 'POST',
				body: JSON.stringify({
					login: login,
					password: password,
					userName: name
				})
			})
				.then(responseHandler)
				.then((data) => {
					setError()
					resolve(data)
				})
				.catch((error: Error) => {
					setError(error)
					reject(error.message)
				})
				.finally(() => {
					setLoading(false)
				})
		})
	}

	function logout() {
		dispatch({ type: 'LOG_OUT' })
	}

	function responseHandler(response: Response) {
		if (!response.ok) {
			throw new Error(`${response.status}: ${response.statusText}`)
		}
		return response.json()
	}
	function setError(error?: Error) {
		dispatch({ type: 'SET_ERROR', errorMessage: error?.message })
	}
	function setLoading(state: boolean) {
		dispatch({ type: 'SET_LOADING', state })
	}

	useEffect(() => {
		if (isClient()) {
			const appData = getLocalStorage()

			if (appData?.token) {
				loginUsingToken(appData.token)
			}
		}
	}, [loginUsingToken])

	useEffect(() => {
		if (authState.user.id) {
			fetch('/api/user/events', { method: 'POST', body: JSON.stringify({ id: authState.user.id }) })
				.then(responseHandler)
				.then((data: Events) => {
					dispatch({ type: 'SET_EVENTS', events: data })
				})
				.catch((error: Error) => {
					setError(error)
				})
		}
	}, [authState.user.id])

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
	login: async () => {},
	register: async () => {},
	loginUsingToken: () => {},
	logout: () => {}
}
