import React, { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import Layout from '@/components/Layout/Layout'
import Button from '@/components/UI/Button'

export default function Login() {
	const { login, loginUsingToken } = useAppContext().Auth
	const [inputLogin, setInputLogin] = useState('Radek')
	const [inputPassword, setInputPassword] = useState('Password')
	const [hasError, setHasError] = useState(false)

	useUserRedirect()

	function loginUser() {
		login(inputLogin, inputPassword)
			.then((token) => {
				loginUsingToken(token)
				setHasError(() => false)
			})
			.catch((error) => {
				console.error(error)

				setHasError(() => true)
			})
	}
	function onLoginInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setInputLogin(() => event.target.value)
	}
	function onPasswordInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setInputPassword(() => event.target.value)
	}

	return (
		<Layout>
			<Button onClick={loginUser}>Login</Button>
			<input type="text" defaultValue={inputLogin} onChange={onLoginInputChange} />
			<input type="text" defaultValue={inputPassword} onChange={onPasswordInputChange} />
			{hasError && <p>Invalid login or password</p>}
		</Layout>
	)
}
