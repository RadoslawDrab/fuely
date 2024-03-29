import React, { useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { checkEmailAndPassword, className, emailRegEx, getSessionStorage, passwordRegEx } from '@/utils'
import { getMessage } from '@/utils/messages'

import { LoginFormProps as Props } from './types/LoginForm.modal'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'
import ResetPasswordModal from './ResetPasswordModal'

import styles from '@styles/styles.module.scss'

export default function LoginForm(props: Props) {
	const emailFromLS: string | null = getSessionStorage()?.formData

	const { getText } = useAppContext().Language

	const [email, setEmail] = useState<string>(emailFromLS ?? '')
	const [password, setPassword] = useState<string>('')
	const [showPasswordResetModal, setShowPasswordResetModal] = useState<boolean>(false)

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const check = checkEmailAndPassword(email, password)
		if (!check.ok) {
			props.onError(check.message)
			return
		}

		props.onLogin(email, password)
	}
	return (
		<>
			<form onSubmit={onSubmit} className={styles.form}>
				<FormInput
					id="email"
					type="email"
					text={'Email'}
					placeholder={'user@mail.com'}
					getValue={(value) => setEmail(() => value)}
					check={(value) => !!value.match(emailRegEx)}
					errorText={getMessage('invalid-email').text}
					defaultValue={email}
					inputData={{ autoComplete: 'email' }}
					icon="user"
				/>
				<FormInput
					id="password"
					type="password"
					text={getText('Password')}
					getValue={(value) => setPassword(() => value)}
					check={(value) => !!value.match(passwordRegEx)}
					errorText={getMessage('invalid-password').text}
					inputData={{ autoComplete: 'current-password' }}
					icon="lock"
				/>
				<Button
					onClick={() => setShowPasswordResetModal(true)}
					className={className(styles.button, styles.span, styles.right)}
					variant="redirect">
					{getText('Forgot password?')}
				</Button>
				<Button type="submit" className={styles['submit-button']} variant="accent">
					{getText('Log in')}
				</Button>
			</form>
			<ResetPasswordModal
				onPasswordReset={props.onPasswordReset}
				showModal={showPasswordResetModal}
				setShowModal={setShowPasswordResetModal}
			/>
		</>
	)
}
