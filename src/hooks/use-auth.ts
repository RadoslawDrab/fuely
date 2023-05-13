import React, { useState } from 'react'
import { Auth } from './Auth.modal'

export default function useAuth(): Auth {
	const [token, setToken] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [user, setUser] = useState({})
	function login(login: string, password: string) {
		fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				login: login,
				password: password
			})
		})
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				setToken(() => data.token)
			})
	}
	function loginUsingToken(token: string) {
		fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				token: token
			})
		})
			.then((response) => {
				return response.json()
			})
			.then((user) => {
				setUser(() => user)
				setIsLoggedIn(() => true)
			})
	}
	function register(login: string, password: string) {
		fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				login: login,
				password: password
			})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`${response.status}:${response.statusText}`)
				}
				return response.json()
			})
			.then((data) => {
				console.log(data)
			})
			.catch((error: Error) => {
				// Converts error text to array and then to an object
				const keys = ['code', 'text']
				const errorObject: { [key: string]: any } = {}
				keys.forEach((key, index) => {
					errorObject[key] = error.message.toString().split(':')[index]
				})

				console.error(errorObject)
			})
	}
	function logout() {
		// Remove token from localStorage
		// ...

		// Remove user
		setUser(() => {})
	}

	return { isLoggedIn, token, user, login, register, loginUsingToken, logout }
}

export const exampleAuthObject: Auth = {
	isLoggedIn: false,
	token: '',
	user: {},
	login: () => {},
	register: () => {},
	loginUsingToken: () => {},
	logout: () => {}
}
