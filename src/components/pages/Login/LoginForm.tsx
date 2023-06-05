import React, { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

import styles from '@styles/styles.module.scss'

interface Props {
	onLogin: (email: string, password: string) => void
	onError: (message: string) => void
	onInputChange: () => void
}
export default function LoginForm(props: Props) {
	const { getText } = useAppContext().Language

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!email || !password) {
			props.onError('Some inputs are empty')
			return
		}

		props.onLogin(email, password)
	}
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<FormInput name="email" type="text" text={'Email'} getValue={(value) => setEmail(() => value)} />
			<FormInput name="password" type="password" text={getText('Password')} getValue={(value) => setPassword(() => value)} />
			<hr />
			<Button className={styles['submit-button']} onClick={() => {}}>
				{getText('Send')}
			</Button>
		</form>
	)
}
