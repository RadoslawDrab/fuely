import { useRouter } from 'next/router'

import useAppContext from '@/hooks/Other/use-app-context'
import { className } from '@/utils'
import { getMessage } from '@/utils/messages'

import { Status } from './api/data/types/index.modal'

import Head from '@/components/Head'
import Section from '@/components/Layout/Section'
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
	const { addNotification, removeAllOfType } = useAppContext().Notification

	const sectionStyles = className(styles.section, styles.center)

	if (isLoggedIn) {
		router.replace('/dashboard')
	}

	function loginUser(email: string, password: string) {
		login(email, password)
			.then(() => {
				removeAllOfType('error')
				addNotification({ type: 'success', content: getMessage('user-authenticated').text })
			})
			.catch((error: Status) => {
				addNotification({ type: 'error', content: getMessage(error.code).text })
			})
	}
	async function resetPassword(resetEmail: string) {
		try {
			const response = await fetch('/api/auth/password-reset', {
				method: 'POST',
				body: JSON.stringify({ email: resetEmail })
			})
			const status: any = await response.json()
			addNotification({ type: 'success', content: getMessage(status.code).text })
		} catch (error: any) {
			setError(error.code)
		}
	}
	function setError(message: string) {
		addNotification({ type: 'error', content: getMessage(message).text })
	}

	return (
		<>
			<Head title="Fuely | Login" description="Fuely login page" />
			<Section title={getText('Log in')} className={sectionStyles} disableContent={isLoading}>
				<LoginForm onLogin={loginUser} onError={setError} onPasswordReset={resetPassword} />
			</Section>
			{isLoading && <LoadingIcon type="car" center />}
		</>
	)
}
