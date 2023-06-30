import { useRouter } from 'next/router'
import { useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { className } from '@/utils'

import { Status } from './api/data/types/index.modal'

import Head from '@/components/Head'
import Section from '@/components/Layout/Section'
import Error from '@/components/UI/Error'
import LoadingIcon from '@/components/UI/LoadingIcon'
import LoginForm from '@/components/pages/Login/LoginForm'

import styles from '@styles/styles.module.scss'

export default function Login() {
	const router = useRouter()

	const {
		login,
		state: { isLoggedIn, isLoading }
	} = useAppContext().Auth
	const { getText } = useAppContext().Language

	const [error, setError] = useState('')

	const sectionStyles = className(styles.section, styles.center)

	if (isLoggedIn) {
		router.replace('/dashboard')
	}

	function loginUser(email: string, password: string) {
		login(email, password)
			.then(() => {
				setError(() => '')
			})
			.catch((error: Status) => {
				const status = error.code.replace('auth/', '')

				switch (status) {
					case 'user-not-found': {
						setError(() => 'Incorrect login or password')
						break
					}
					case 'wrong-password': {
						setError(() => 'Incorrect login or password')
						break
					}
					default: {
						setError(() => error.code)
						break
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
		<>
			<Head title="Fuely | Login" description="Fuely login page" />
			<Section title={getText('Log in')} className={sectionStyles}>
				<LoginForm onLogin={loginUser} onError={onFormError} onInputChange={() => setError(() => '')} />
				<Error className={styles.error} show={error ? true : false} text={error} />
			</Section>
		</>
	)
}
