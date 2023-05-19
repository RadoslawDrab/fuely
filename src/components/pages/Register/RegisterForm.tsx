import React, { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'

import Button from '../../UI/Button'
import Input from '../../UI/Input'

import styles from '@styles/styles.module.scss'

interface Props {
	onRegister: (login: string, password: string) => void
	onError: (errorMessage: string) => void
	onInputChange: () => void
}

export default function RegisterForm(props: Props) {
	type InputType = 'login' | 'password-1' | 'password-2'

	const { getText } = useAppContext().Language

	const [login, setLogin] = useState('')
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (!login || !password1 || !password2) {
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

		props.onRegister(login, password1)
	}

	function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		props.onInputChange()
		const inputType: any = event.target.dataset.type
		const value = event.target.value
		const type: InputType = inputType
		switch (type) {
			case 'login': {
				setLogin(() => value)
				break
			}
			case 'password-1': {
				setPassword1(() => value)
				break
			}
			case 'password-2': {
				setPassword2(() => value)
				break
			}
		}
	}
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<label htmlFor="login-input">{getText('Login')}</label>
			<Input id="login-input" type="text" onChange={onInputChange} placeholder={getText('Login')} data={{ type: 'login' }} />
			<label htmlFor="password-1-input">{getText('Password')}</label>
			<Input
				id="password-1-input"
				type="password"
				onChange={onInputChange}
				placeholder={getText('Password')}
				data={{ type: 'password-1' }}
			/>
			<label htmlFor="password-2-input">{getText('Confirm Password')}</label>
			<Input
				id="password-2-input"
				type="password"
				onChange={onInputChange}
				placeholder={getText('Password')}
				data={{ type: 'password-2' }}
			/>
			<hr />
			<Button className={styles['submit-button']} onClick={() => {}}>
				{getText('Send')}
			</Button>
		</form>
	)
}