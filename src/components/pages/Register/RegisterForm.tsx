import React, { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'
import { emailRegEx, passwordRegEx, passwordInfo, checkEmailAndPassword } from '@/utils'

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
		const check = checkEmailAndPassword(email, password)
		if (!check.ok) {
			props.onError(check.message)
			return
		}
		if (!name) {
			props.onError('Some inputs are empty')
			return
		}
		if (name.length < 3) {
			props.onError('Name must contain at least 3 characters')
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
				check={(value) => !!value.match(emailRegEx)}
				errorText="Enter valid email"
			/>
			<FormInput
				id="password"
				type="password"
				getValue={(value) => setPassword(() => value)}
				text={getText('Password')}
				check={(value) => !!value.match(passwordRegEx)}
				errorText={passwordInfo}
			/>
			<hr />
			<FormInput
				id="name"
				type="text"
				getValue={(value) => setName(() => value)}
				text={getText('Name')}
				placeholder="e.g. John"
				check={(value) => value.length >= 3}
				errorText="Name must contain at least 3 characters"
			/>
			<hr />
			<Button className={styles['submit-button']} onClick={() => {}}>
				{getText('Send')}
			</Button>
		</form>
	)
}
