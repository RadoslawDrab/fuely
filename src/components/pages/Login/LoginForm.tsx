import React, { useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { checkEmailAndPassword, emailRegEx, getSessionStorage, passwordInfo, passwordRegEx } from '@/utils'

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
					type="text"
					text={'Email'}
					getValue={(value) => setEmail(() => value)}
					check={(value) => !!value.match(emailRegEx)}
					errorText="Enter valid email"
					defaultValue={email}
					inputData={{ autoComplete: 'email' }}
				/>
				<FormInput
					id="password"
					type="password"
					text={getText('Password')}
					getValue={(value) => setPassword(() => value)}
					check={(value) => !!value.match(passwordRegEx)}
					errorText={passwordInfo}
					inputData={{ autoComplete: 'current-password' }}
				/>
				<hr />
				<Button onClick={() => setShowPasswordResetModal(true)}>Reset password</Button>
				<hr />
				<Button type="submit" className={styles['submit-button']}>
					{getText('Send')}
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
