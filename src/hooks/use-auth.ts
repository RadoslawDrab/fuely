import React, { useCallback, useEffect, useState } from 'react'

import { getLocalStorage, isClient, setLocalStorage } from '@/utils'
import { Auth } from './Auth.modal'
import { User } from '@/pages/api/auth'

export default function useAuth(): Auth {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [user, setUser] = useState<User | null>(null)

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
					setLocalStorage(data)
					resolve(data.token)
				})
				.catch(reject)
				.finally(() => {
					setIsLoading(() => false)
				})
		})
	}
	const loginUsingToken = useCallback(function (token: string) {
		setIsLoading(() => true)

		fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				token: token
			})
		})
			.then(responseHandler)
			.then((user: User) => {
				setUser(() => user)
				setIsLoggedIn(() => true)
			})
			.catch(catchHandler)
			.finally(() => {
				setIsLoading(() => false)
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
				.then(resolve)
				.catch(reject)
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
	function catchHandler(error: Error) {
		console.error(error)
	}

	useEffect(() => {
		if (isClient()) {
			const appData = getLocalStorage()

			if (appData?.token) {
				loginUsingToken(appData.token)
			}
		}
	}, [loginUsingToken])

	return { isLoggedIn, isLoading, user, login, register, loginUsingToken, logout }
}

export const exampleAuthObject: Auth = {
	isLoggedIn: false,
	isLoading: false,
	user: null,
	login: async () => {},
	register: async () => {},
	loginUsingToken: () => {},
	logout: () => {}
}
