import React, { useState } from 'react'

import { emailRegEx, passwordRegEx } from '@/utils'
import useAppContext from '@/hooks/Other/use-app-context'

import { AccountFormProps as Props } from '../types/AccountSection.modal'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

import defaultStyles from '@styles/styles.module.scss'
import { getMessage } from '@/utils/messages'

export default function AccountForm(props: Props) {
	const { getText } = useAppContext().Language
	const { user } = useAppContext().Auth

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
			if (newEmail === user.email) {
				props.onError('same-email')
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
		if (!newEmail && !newPassword) {
			return props.onError('not-enough-data')
		}

		props.onFormSubmit(email, password)
	}
	return (
		<form className={defaultStyles.form} onSubmit={onFormSubmit}>
			<FormInput
				id="email"
				text={getText('New Email')}
				placeholder="email@gmail.com"
				type="email"
				getValueOnBlur={(value) => setNewEmail(value)}
				defaultValue={newEmail}
				inputData={{ title: 'e.g. email@gmail.com' }}
				notRequired
				icon="user"
			/>
			<hr />
			<FormInput
				id="new-password"
				text={getText('New Password')}
				placeholder={getText('Password')}
				type="password"
				getValueOnBlur={(value) => setNewPassword(value)}
				inputData={{
					title: getMessage(
						'Password must contain: minimum 8 characters, uppercase letter, lowercase letter, number and special character'
					).text
				}}
				notRequired
				icon="lock"
			/>
			<hr />
			<Button type="submit" className={defaultStyles['submit-button']} variant="accent">
				{getText('Save')}
			</Button>
		</form>
	)
}
