import { useRouter } from 'next/router'
import { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'
import { className } from '@/utils'
import { Status } from '../api/auth'

import Section from '@/components/Layout/Section'
import Error from '@/components/UI/Error'
import LoadingIcon from '@/components/UI/LoadingIcon'
import RegisterForm from '@/components/pages/Register/RegisterForm'

import styles from '@styles/styles.module.scss'

export default function Register() {
	const router = useRouter()

	const {
		register,
		state: { isLoggedIn, isLoading }
	} = useAppContext().Auth
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
				setFormError('')
			})
			.catch((error: Status) => {
				const status = error.code.replace('auth/', '')
				switch (status) {
					case 'email-already-in-use': {
						setFormError('Email is already in use')
						break
					}
					default: {
						setFormError(status)
						break
					}
				}
			})
	}
	function setFormError(message: string) {
		setError(() => message)
	}

	if (isLoading) {
		return <LoadingIcon />
	}

	return (
		<Section title={getText('Register')} className={sectionStyles}>
			<RegisterForm onRegister={registerUser} onError={setFormError} onInputChange={() => setError(() => '')} />
			<Error show={error ? true : false} text={error} className={styles.error} />
		</Section>
	)
}
