import { useRouter } from 'next/router'
import { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'
import { className } from '@/utils'
import { Status } from '../api/auth'

import Section from '@/components/Layout/Section'
import LoginForm from '@/components/pages/Login/LoginForm'
import Error from '@/components/UI/Error'
import LoadingIcon from '@/components/UI/LoadingIcon'

import styles from '@styles/styles.module.scss'

export default function Login() {
	const router = useRouter()

	const {
		login: loginFunc,
		state: { isLoggedIn, isLoading }
	} = useAppContext().Auth
	const { getText } = useAppContext().Language

	const [error, setError] = useState('')

	const sectionStyles = className(styles.section, styles.center)

	if (isLoggedIn) {
		router.replace('/user/dashboard')
	}

	function loginUser(login: string, password: string) {
		loginFunc(login, password)
			.then(() => {
				setError(() => '')
				router.replace('/user/dashboard')
			})
			.catch((error: Status) => {
				const status = error.code.replace('auth/', '')

				switch (status) {
					case 'user-not-found': {
						setError(() => 'Incorrect login or password')
					}
					case 'wrong-password': {
						setError(() => 'Incorrect login or password')
					}
				}
			})
	}
	function onFormError(message: string) {
		setError(() => message)
	}

	if (isLoading) {
		return <LoadingIcon />
	}
	return (
		<Section title={getText('Log in')} className={sectionStyles}>
			<LoginForm onLogin={loginUser} onError={onFormError} onInputChange={() => setError(() => '')} />
			<Error className={styles.error} show={error ? true : false} text={error} />
		</Section>
	)
}
