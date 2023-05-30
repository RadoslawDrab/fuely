import React, { useState } from 'react'
import { useRouter } from 'next/router'

import useAppContext from '@/hooks/use-app-context'
import { className } from '@/utils'

import RegisterForm from '@/components/pages/Register/RegisterForm'
import Section from '@/components/Layout/Section'
import Error from '@/components/UI/Error'

import styles from '@styles/styles.module.scss'

export default function Register() {
	const router = useRouter()

	const { register, isLoggedIn } = useAppContext().Auth
	const { getText } = useAppContext().Language

	const [error, setError] = useState('')

	const sectionStyles = className(styles.section, styles.center)

	if (isLoggedIn) {
		router.replace('/user/dashboard')
	}

	function registerUser(login: string, password: string, name: string) {
		register(login, password, name)
			.then(() => {
				router.replace('/user/login')
				setError(() => '')
			})
			.catch(() => {
				setError(() => 'User already exists')
			})
	}
	function onFormError(message: string) {
		setError(() => message)
	}

	return (
		<Section title={getText('Register')} className={sectionStyles}>
			<RegisterForm onRegister={registerUser} onError={onFormError} onInputChange={() => setError(() => '')} />
			<Error show={error ? true : false} text={error} className={styles.error} />
		</Section>
	)
}
