import React, { useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { emailRegEx, passwordRegEx, checkEmailAndPassword } from '@/utils'
import { getMessage } from '@/utils/messages'

import { RegisterFormProps as Props } from './types/RegisterForm.modal'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

import styles from '@styles/styles.module.scss'

export default function RegisterForm(props: Props) {
	const { getText } = useAppContext().Language

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const check = checkEmailAndPassword(email, password)
		if (!check.ok) {
			props.onError(check.message)
			return
		}
		if (!name) {
			props.onError('not-enough-data')
			return
		}
		if (name.length < 3) {
			props.onError('invalid-name')
			return
		}

		props.onRegister(email, password, name)
	}

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<FormInput
				id="email"
				type="text"
				getValue={(value) => setEmail(() => value)}
				text={'Email'}
				placeholder="email@gmail.com"
				check={(value) => !!value.match(emailRegEx)}
				errorText={getMessage('invalid-email').text}
				icon="user"
			/>
			<FormInput
				id="password"
				type="password"
				getValue={(value) => setPassword(() => value)}
				text={getText('Password')}
				check={(value) => !!value.match(passwordRegEx)}
				errorText={getMessage('invalid-password').text}
				icon="lock"
			/>
			<hr />
			<FormInput
				id="name"
				type="text"
				getValue={(value) => setName(() => value)}
				text={getText('Username')}
				placeholder="e.g. John"
				check={(value) => value.length >= 3}
				errorText={getMessage('invalid-name').text}
				icon="identification-card"
			/>
			<Button type="submit" className={styles['submit-button']} variant="accent">
				{getText('Register')}
			</Button>
		</form>
	)
}
