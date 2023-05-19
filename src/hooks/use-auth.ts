import { useCallback, useEffect, useState } from 'react'

import { getLocalStorage, isClient, setLocalStorage } from '@/utils'
import { Auth } from './Auth.modal'
import { User } from '@/pages/api/auth'

export default function useAuth(): Auth {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [user, setUser] = useState<User | null>(null)
	const [hasError, setHasError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')

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
					noError()
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
				.then((user: User) => {
					noError()
					setUser(() => user)
					setIsLoggedIn(() => true)
					resolve(user)
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

	async function register(login: string, password: string): Promise<any> {
		setIsLoading(() => true)

		return new Promise((resolve, reject) => {
			fetch('/api/auth/register', {
				method: 'POST',
				body: JSON.stringify({
					login: login,
					password: password
				})
			})
				.then(responseHandler)
				.then((data) => {
					noError()
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
		setIsLoggedIn(() => false)
	}

	function responseHandler(response: Response) {
		if (!response.ok) {
			throw new Error(`${response.status}: ${response.statusText}`)
		}
		return response.json()
	}
	function setError(error: Error) {
		setHasError(() => true)
		setErrorMessage(() => error.message)
	}
	function noError() {
		setHasError(() => false)
		setErrorMessage(() => '')
	}

	useEffect(() => {
		if (isClient()) {
			const appData = getLocalStorage()

			if (appData?.token) {
				loginUsingToken(appData.token)
			}
		}
	}, [loginUsingToken])

	return { isLoggedIn, isLoading, user, errorMessage, hasError, login, register, loginUsingToken, logout }
}

export const exampleAuthObject: Auth = {
	isLoggedIn: false,
	isLoading: false,
	user: null,
	hasError: false,
	errorMessage: '',
	login: async () => {},
	register: async () => {},
	loginUsingToken: () => {},
	logout: () => {}
}
