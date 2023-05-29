import React, { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

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
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<FormInput name="login" type="text" text={getText('Login')} getValue={(value) => setLogin(() => value)} />
			<FormInput name="password" type="password" text={getText('Password')} getValue={(value) => setPassword(() => value)} />
			<hr />
			<Button className={styles['submit-button']} onClick={() => {}}>
				{getText('Send')}
			</Button>
		</form>
	)
}
