import { useRouter } from 'next/router'

import useAppContext from '@/hooks/Other/use-app-context'
import { className } from '@/utils'
import useNotification from '@/hooks/Other/use-notification'

import { Status } from './api/data/types/index.modal'

import Head from '@/components/Head'
import Section from '@/components/Layout/Section'
import LoadingIcon from '@/components/UI/LoadingIcon'
import RegisterForm from '@/components/pages/Register/RegisterForm'
import Notification from '@/components/UI/Notification'

import styles from '@styles/styles.module.scss'

export default function Register() {
	const router = useRouter()

	const {
		register,
		state: { isLoggedIn, isLoading }
	} = useAppContext().Auth
	const { getText } = useAppContext().Language

	const { addNotification, removeNotification, getNotifications, removeAllOfType } = useNotification()
	const sectionStyles = className(styles.section, styles.center)

	if (isLoggedIn) {
		router.replace('/dashboard')
	}

	function registerUser(email: string, password: string, name: string) {
		register(email, password, name)
			.then(() => {
				removeAllOfType('error')
				addNotification({ type: 'success', content: 'User created. Verify to log in.' })
			})
			.catch((error: Status) => {
				const status = error.code.replace('auth/', '')
				switch (status) {
					case 'email-already-in-use': {
						setFormError('Email is already in use', false, 0)
						break
					}
					default: {
						setFormError(status)
						break
					}
				}
			})
	}
	function setFormError(message: string, back: boolean = false, index?: number) {
		addNotification({ type: 'error', content: message }, back, index)
	}
	const notifications = getNotifications().map((not) => {
		function removeCurrentNotification(index: number) {
			removeNotification(index)
		}
		return (
			<Notification key={not.index} index={not.index} title={not.title} onClose={removeCurrentNotification} type={not.type}>
				{not.content}
			</Notification>
		)
	})

	if (isLoading) {
		return <LoadingIcon />
	}

	return (
		<>
			<Head title="Fuely | Register" description="Fuely register page" />
			<Section title={getText('Register')} className={sectionStyles}>
				<RegisterForm onRegister={registerUser} onError={setFormError} onInputChange={() => removeAllOfType('error')} />
			</Section>
			{notifications}
		</>
	)
}
