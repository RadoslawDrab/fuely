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
				getValue={(value) => setEmail(() => value)}
				check={(value) => !!value.match(emailRegEx)}
				errorText="Enter valid email"
				defaultValue={email}
				inputData={{ autoComplete: 'email' }}
			/>
			<hr />
			<Button type="submit" className={styles['submit-button']}>
				{getText('Send')}
			</Button>
		</form>
	)
}
