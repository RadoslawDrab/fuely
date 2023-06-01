import React, { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

import styles from '@styles/styles.module.scss'

interface Props {
	onRegister: (login: string, password: string, name: string) => void
	onError: (errorMessage: string) => void
	onInputChange: () => void
}

export default function RegisterForm(props: Props) {
	const { getText } = useAppContext().Language

	const [login, setLogin] = useState('')
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')
	const [name, setName] = useState('')

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (!login || !password1 || !password2 || !name) {
			props.onError('Some inputs are empty')
			return
		}
		if (login.length <= 3) {
			props.onError('Login must have more than 3 characters ')
			return
		}
		if (password1 !== password2) {
			props.onError('Passwords are not the same')
			return
		}
		if (password1.length <= 6) {
			props.onError('Password must have more than 6 characters ')
			return
		}
		if (name.length <= 3) {
			props.onError('Name must have more than 3 characters')
			return
		}

		props.onRegister(login, password1, name)
	}

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<FormInput
				name="login"
				type="text"
				getValue={(value) => setLogin(() => value)}
				text={getText('Login')}
				check={(value) => value.length > 4}
				errorText="Login must be longer than 4 characters"
			/>
			<FormInput
				name="password-1"
				type="password"
				getValue={(value) => setPassword1(() => value)}
				text={getText('Password')}
				check={(value) => value.length > 5}
				errorText="Password must be longer than 5 characters"
			/>
			<FormInput
				name="password-2"
				type="password"
				getValue={(value) => setPassword2(() => value)}
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
