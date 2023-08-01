import React, { useState } from 'react'

import { emailRegEx, passwordInfo, passwordRegEx } from '@/utils'

import { AccountFormProps as Props } from '../types/AccountSection.modal'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

import defaultStyles from '@styles/styles.module.scss'

export default function AccountForm(props: Props) {
	const [newEmail, setNewEmail] = useState<string | null>(null)
	const [newPassword, setNewPassword] = useState<string | null>(null)

	function onFormSubmit(e: React.MouseEvent<HTMLFormElement>) {
		e.preventDefault()

		const email = ((): string | null => {
			if (!newEmail) {
				return null
			}
			if (!newEmail?.match(emailRegEx)) {
				props.onError('invalid-email')
				return null
			}

			return newEmail
		})()
		const password = ((): string | null => {
			if (!newPassword) {
				return null
			}
			if (!newPassword?.match(passwordRegEx)) {
				props.onError('invalid-password')
				return null
			}

			return newPassword
		})()
		// If neither of inputs are filled returns error
		if (!email && !password) {
			return props.onError('not-enough-data')
		}

		props.onFormSubmit(email, password)
	}
	return (
		<form className={defaultStyles.form} onSubmit={onFormSubmit}>
			<FormInput
				id="email"
				text="New Email"
				type="email"
				getValueOnBlur={(value) => setNewEmail(value)}
				defaultValue={newEmail}
				inputData={{ title: 'e.g. email@gmail.com' }}
				notRequired
			/>
			<hr />
			<FormInput
				id="new-password"
				text="New Password"
				type="password"
				getValueOnBlur={(value) => setNewPassword(value)}
				inputData={{ title: passwordInfo }}
				notRequired
			/>
			<Button className={defaultStyles['submit-button']}>Save</Button>
		</form>
	)
}
