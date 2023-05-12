import React, { useState } from 'react'
import { Auth } from './Auth.modal'

export default function useAuth(): Auth {
	const [token, setToken] = useState('')
	function login(login: string, password: string) {
		fetch('http://localhost:3000/api/auth/login', {
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
	function register(login: string, password: string) {
		fetch('http://localhost:3000/api/auth/register', {
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
				console.log(data)
			})
	}

	return { isLoggedIn: false, token, login, register }
}

export const exampleAuthObject: Auth = {
	isLoggedIn: false,
	token: '',
	login: () => {},
	register: () => {}
}
