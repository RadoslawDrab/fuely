import React, { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import Section from '@/components/Layout/Section'
import LoginForm from '@/components/pages/Login/LoginForm'
import Error from '@/components/UI/Error'

import styles from '@styles/styles.module.scss'

export default function Login() {
	const { login: loginFunc, loginUsingToken, isLoggedIn } = useAppContext().Auth
	const [error, setError] = useState('')

	useUserRedirect()

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
		<Section title="Log in">
			<LoginForm onLogin={loginUser} onError={onFormError} onInputChange={() => setError(() => '')} />
			<Error className={styles.error} show={error ? true : false} text={error} />
		</Section>
	)
}
