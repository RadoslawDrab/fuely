import React, { useState } from 'react'
import { useRouter } from 'next/router'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import Layout from '@/components/Layout/Layout'
import Button from '@/components/UI/Button'

export default function Register() {
	const router = useRouter()
	const { register } = useAppContext().Auth
	const [inputLogin, setInputLogin] = useState('Radek')
	const [inputPassword, setInputPassword] = useState('Password')
	const [hasError, setHasError] = useState(false)

	useUserRedirect()

	function registerUser() {
		register(inputLogin, inputPassword)
			.then(() => {
				router.replace('/user/login')
				setHasError(() => false)
			})
			.catch(() => {
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
			<Button onClick={registerUser}>Register</Button>
			<input type="text" defaultValue={inputLogin} onChange={onLoginInputChange} />
			<input type="text" defaultValue={inputPassword} onChange={onPasswordInputChange} />
			{hasError && <p>User already exists</p>}
		</Layout>
	)
}
