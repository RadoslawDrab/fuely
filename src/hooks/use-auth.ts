import { useCallback, useEffect, useState } from 'react'

import { getLocalStorage, isClient, setLocalStorage } from '@/utils'
import { Auth } from './Auth.modal'
import { Events } from './Events.modal'
import { UserSettings } from '@/pages/api/auth'

export default function useAuth(): Auth {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [user, setUser] = useState<UserSettings | null>(null)
	const [hasError, setHasError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [userId, setUserId] = useState<string>('')
	const [events, setEvents] = useState<Events>({})

	async function login(login: string, password: string) {
		return new Promise((resolve, reject) => {
			setIsLoading(() => true)

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
					setLocalStorage(data)
					resolve(data.token)
				})
				.catch((error: Error) => {
					setError(error)
					reject(error.message)
				})
				.finally(() => {
					setIsLoading(() => false)
				})
		})
	}
	const loginUsingToken = useCallback(function (token: string) {
		setIsLoading(() => true)

		return new Promise((resolve, reject) => {
			fetch('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					token: token
				})
			})
				.then(responseHandler)
				.then((data) => {
					setError()
					setUser(() => data.user)
					setUserId(() => data.userId)
					setIsLoggedIn(() => true)
					resolve(data.user)
				})
				.catch((error: Error) => {
					setError(error)
					reject(error.message)
				})
				.finally(() => {
					setIsLoading(() => false)
				})
		})
	}, [])

	async function register(login: string, password: string, name: string): Promise<any> {
		setIsLoading(() => true)

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
					setIsLoading(() => false)
				})
		})
	}
	function logout() {
		// Remove token from localStorage
		setLocalStorage({ token: undefined })
		setUser(() => null)
		setUserId(() => '')
		setIsLoggedIn(() => false)
	}

	function responseHandler(response: Response) {
		if (!response.ok) {
			throw new Error(`${response.status}: ${response.statusText}`)
		}
		return response.json()
	}
	function setError(error?: Error) {
		if (error) {
			setHasError(() => true)
			setErrorMessage(() => error.message)
		} else {
			setHasError(() => false)
			setErrorMessage(() => '')
		}
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
		if (!userId) {
			return
		}
		fetch('/api/user/events', { method: 'POST', body: JSON.stringify({ id: userId }) })
			.then(responseHandler)
			.then((data: Events) => {
				setEvents(() => data)
			})
			.catch((error: Error) => {
				setError(error)
			})
	}, [userId])

	return { isLoggedIn, isLoading, user, errorMessage, hasError, userId, events, login, register, loginUsingToken, logout }
}

export const exampleAuthObject: Auth = {
	isLoggedIn: false,
	isLoading: false,
	user: null,
	userId: '',
	hasError: false,
	errorMessage: '',
	events: {},
	login: async () => {},
	register: async () => {},
	loginUsingToken: () => {},
	logout: () => {}
}
