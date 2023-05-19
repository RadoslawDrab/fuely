import React, { useState } from 'react'

import Button from '@/components/UI/Button'
import Input from '@/components/UI/Input'

import styles from '@styles/styles.module.scss'

interface Props {
	onLogin: (login: string, password: string) => void
	onError: (message: string) => void
	onInputChange: () => void
}
export default function LoginForm(props: Props) {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!login || !password) {
			props.onError('Some inputs are empty')
			return
		}

		props.onLogin(login, password)
	}

	function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		props.onInputChange()
		const value = event.target.value

		switch (event.target.dataset.type) {
			case 'login': {
				setLogin(() => value)
				break
			}
			case 'password': {
				setPassword(() => value)
				break
			}
		}
	}
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<label htmlFor="login-input">Login</label>
			<Input
				id="login-input"
				type="text"
				placeholder="Login"
				onChange={onInputChange}
				data={{ type: 'login' }}
				defaultValue="Radek"
			/>
			<label htmlFor="password-input">Password</label>
			<Input
				id="password-input"
				type="password"
				placeholder="Password"
				onChange={onInputChange}
				data={{ type: 'password' }}
				defaultValue="Password1"
			/>
			<hr />
			<Button className={styles['submit-button']} onClick={() => {}}>
				Login
			</Button>
		</form>
	)
}
