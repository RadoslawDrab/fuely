import React, { useState } from 'react'
import { useRouter } from 'next/router'

import useAppContext from '@/hooks/use-app-context'

import Section from '@/components/Layout/Section'
import LoginForm from '@/components/pages/Login/LoginForm'
import Error from '@/components/UI/Error'

import styles from '@styles/styles.module.scss'

export default function Login() {
	const router = useRouter()

	const { login: loginFunc, loginUsingToken, isLoggedIn } = useAppContext().Auth
	const { getText } = useAppContext().Language

	const [error, setError] = useState('')

	if (isLoggedIn) {
		router.replace('/user/dashboard')
	}

	function loginUser(login: string, password: string) {
		loginFunc(login, password)
			.then((token) => {
				loginUsingToken(token)
				setError(() => '')
			})
			.catch((error) => {
				const code = +error.split(':')[0]
				if (code === 404) {
					setError(() => 'Incorrect login or password')
				} else {
					setError(() => error)
				}
			})
	}
	function onFormError(message: string) {
		setError(() => message)
	}
	return (
		<Section title={getText('Log in')}>
			<LoginForm onLogin={loginUser} onError={onFormError} onInputChange={() => setError(() => '')} />
			<Error className={styles.error} show={error ? true : false} text={error} />
		</Section>
	)
}
