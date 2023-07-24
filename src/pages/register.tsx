import { useRouter } from 'next/router'

import useAppContext from '@/hooks/Other/use-app-context'
import { className } from '@/utils'
import { getMessage } from '@/utils/messages'

import { Status } from './api/data/types/index.modal'

import Head from '@/components/Head'
import Section from '@/components/Layout/Section'
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
	const { removeAllOfType, addNotification } = useAppContext().Notification

	const sectionStyles = className(styles.section, styles.center)

	if (isLoggedIn) {
		router.replace('/dashboard')
	}

	function registerUser(email: string, password: string, name: string) {
		register(email, password, name)
			.then(() => {
				removeAllOfType('error')
				addNotification({ type: 'success', content: getMessage('user-created').text + '. ' + getMessage('verify-email').text })
			})
			.catch((error: Status) => {
				const status = error.code.replace('auth/', '')
				setFormError(getMessage(status).text)
			})
	}
	function setFormError(message: string, timer: number = 0, synchronousTimer: boolean = true, index?: number) {
		addNotification({ type: 'error', content: message, timer }, synchronousTimer, index)
	}

	return (
		<>
			<Head title="Fuely | Register" description="Fuely register page" />
			<Section title={getText('Register')} className={sectionStyles} disableContent={isLoading}>
				<RegisterForm onRegister={registerUser} onError={setFormError} onInputChange={() => removeAllOfType('error')} />
			</Section>
			{isLoading && <LoadingIcon type="car" center />}
		</>
	)
}
