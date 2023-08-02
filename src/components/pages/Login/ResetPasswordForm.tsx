import React, { useState } from 'react'

import { emailRegEx } from '@/utils'
import useAppContext from '@/hooks/Other/use-app-context'

import { ResetPasswordFormProps as Props } from './types/ResetPassword.modal'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

import styles from '@styles/styles.module.scss'

export default function ResetPasswordForm(props: Props) {
	const { getText } = useAppContext().Language

	const [email, setEmail] = useState<string>('')

	function onSubmit(event: React.FormEvent) {
		event.preventDefault()
		if (email) props.onSubmit(email)
	}
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<FormInput
				id="email"
				type="text"
				text={'Email'}
				placeholder="email@gmail.com"
				getValue={(value) => setEmail(() => value)}
				check={(value) => !!value.match(emailRegEx)}
				errorText="Enter valid email"
				defaultValue={email}
				inputData={{ autoComplete: 'email' }}
				icon="user"
			/>
			<Button type="submit" className={styles['submit-button']} variant="accent">
				{getText('Send')}
			</Button>
		</form>
	)
}
