import React, { useState } from 'react'

import { emailRegEx, passwordInfo, passwordRegEx } from '@/utils'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

import defaultStyles from '@styles/styles.module.scss'

interface Props {
	onPasswordChange: (newPassword: string) => void
	onEmailChange: (newEmail: string) => void
	onError: (error: string | null) => void
}
export default function AccountForm(props: Props) {
	const [email, setEmail] = useState<string | null>(null)
	const [oldPassword, setOldPassword] = useState<string | null>(null)
	const [newPassword, setNewPassword] = useState<string | null>(null)

	function onEmailChange(e: React.MouseEvent<HTMLFormElement>) {
		e.preventDefault()
		props.onError(null)
		if (!email) {
			return props.onError('Invalid email')
		} else {
			props.onEmailChange(email)
		}
	}
	function onPasswordChange(e: React.MouseEvent<HTMLFormElement>) {
		e.preventDefault()
		props.onError(null)
		if (!oldPassword || !newPassword) {
			return props.onError("Old and new password input can't be empty")
		} else if (oldPassword === newPassword) {
			return props.onError("New password can't be the same as old one")
		} else {
			props.onPasswordChange(newPassword)
		}
	}
	return (
		<>
			<form className={defaultStyles.form} onSubmit={onEmailChange}>
				<FormInput
					id="email"
					text="Email"
					type="email"
					getValueOnBlur={(value) => setEmail(value)}
					defaultValue={email}
					check={(value) => !!value.match(emailRegEx)}
					errorText="Enter valid email"
				/>
				<Button onClick={() => {}} className={defaultStyles['submit-button']}>
					Save
				</Button>
			</form>
			<hr />
			<form className={defaultStyles.form} onSubmit={onPasswordChange}>
				<FormInput id="old-password" text="Old Password" type="password" getValueOnBlur={(value) => setOldPassword(value)} />
				<FormInput
					id="new-password"
					text="New Password"
					type="password"
					getValueOnBlur={(value) => setNewPassword(value)}
					check={(value) => !!value.match(passwordRegEx)}
					errorText={passwordInfo}
				/>
				<Button onClick={() => {}} className={defaultStyles['submit-button']}>
					Save
				</Button>
			</form>
		</>
	)
}
