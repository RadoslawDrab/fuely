import React, { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'

import Button from '@/components/UI/Button'
import Input from '@/components/UI/Input'

import styles from '@styles/styles.module.scss'

interface Props {
	onLogin: (login: string, password: string) => void
	onError: (message: string) => void
	onInputChange: () => void
}
export default function LoginForm(props: Props) {
	const { getText } = useAppContext().Language

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
			<label htmlFor="login-input">{getText('Login')}</label>
			<Input id="login-input" type="text" placeholder={getText('Login')} onChange={onInputChange} data={{ type: 'login' }} />
			<label htmlFor="password-input">{getText('Password')}</label>
			<Input
				id="password-input"
				type="password"
				placeholder={getText('Password')}
				onChange={onInputChange}
				data={{ type: 'password' }}
			/>
			<hr />
			<Button className={styles['submit-button']} onClick={() => {}}>
				{getText('Send')}
			</Button>
		</form>
	)
}
