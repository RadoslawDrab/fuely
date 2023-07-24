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
			})
			.catch((error: Status) => {
				addNotification({ type: 'error', content: getMessage(error.code).text })
			})
	}
	function setError(message: string) {
		addNotification({ type: 'error', content: message })
	}

	return (
		<>
			<Head title="Fuely | Login" description="Fuely login page" />
			<Section title={getText('Log in')} className={sectionStyles} disableContent={isLoading}>
				<LoginForm onLogin={loginUser} onError={setError} onInputChange={() => {}} />
			</Section>
			{isLoading && <LoadingIcon type="car" center />}
		</>
	)
}
