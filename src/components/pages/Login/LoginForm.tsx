import React, { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'
import { checkEmailAndPassword, emailRegEx, getSessionStorage, passwordInfo, passwordRegEx } from '@/utils'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

import styles from '@styles/styles.module.scss'

interface Props {
	onLogin: (email: string, password: string) => void
	onError: (message: string) => void
	onInputChange: () => void
}
export default function LoginForm(props: Props) {
	const emailFromLS: string | null = getSessionStorage()?.formData

	const { getText } = useAppContext().Language

	const [email, setEmail] = useState(emailFromLS ?? '')
	const [password, setPassword] = useState('')

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const check = checkEmailAndPassword(email, password)
		if (!check.ok) {
			props.onError(check.message)
			return
		}

		props.onLogin(email, password)
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
			/>
			<FormInput
				id="password"
				type="password"
				text={getText('Password')}
				getValue={(value) => setPassword(() => value)}
				check={(value) => !!value.match(passwordRegEx)}
				errorText={passwordInfo}
			/>
			<hr />
			<Button className={styles['submit-button']} onClick={() => {}}>
				{getText('Send')}
			</Button>
		</form>
	)
}
