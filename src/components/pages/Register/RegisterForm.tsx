import React, { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

import styles from '@styles/styles.module.scss'

interface Props {
	onRegister: (email: string, password: string, name: string) => void
	onError: (errorMessage: string) => void
	onInputChange: () => void
}

export default function RegisterForm(props: Props) {
	const { getText } = useAppContext().Language

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (!email || !password || !name) {
			props.onError('Some inputs are empty')
			return
		}
		if (email.length <= 3) {
			props.onError('Email must have more than 3 characters ')
			return
		}
		if (password.length <= 6) {
			props.onError('Password must have more than 6 characters ')
			return
		}
		if (name.length <= 3) {
			props.onError('Name must have more than 3 characters')
			return
		}

		props.onRegister(email, password, name)
	}

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<FormInput
				name="email"
				type="text"
				getValue={(value) => setEmail(() => value)}
				text={'Email'}
				check={(value) => value.length > 4}
				errorText="Enter valid email"
			/>
			<FormInput
				name="password"
				type="password"
				getValue={(value) => setPassword(() => value)}
				text={getText('Password')}
				check={(value) => value.length > 5}
				errorText="Password must be longer than 5 characters"
			/>
			<hr />
			<FormInput
				name="name"
				type="text"
				getValue={(value) => setName(() => value)}
				text={getText('Name')}
				placeholder="e.g. John"
			/>
			<hr />
			<Button className={styles['submit-button']} onClick={() => {}}>
				{getText('Send')}
			</Button>
		</form>
	)
}
