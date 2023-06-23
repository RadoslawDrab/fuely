import React, { useState } from 'react'

import { passwordRegEx, passwordInfo } from '@/utils'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

import defaultStyles from '@styles/styles.module.scss'

interface Props {
	onPasswordChange: (newPassword: string) => void
	onError: (error: string | null) => void
}
export default function PasswordChangeForm(props: Props) {
	const [oldPassword, setOldPassword] = useState<string | null>(null)
	const [newPassword, setNewPassword] = useState<string | null>(null)

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
		<form className={defaultStyles.form} onSubmit={onPasswordChange}>
			<FormInput
				id="old-password"
				text="Old Password"
				type="password"
				getValue={() => props.onError(null)}
				getValueOnBlur={(value) => setOldPassword(value)}
			/>
			<FormInput
				id="new-password"
				text="New Password"
				type="password"
				getValue={() => props.onError(null)}
				getValueOnBlur={(value) => setNewPassword(value)}
				check={(value) => !!value.match(passwordRegEx)}
				errorText={passwordInfo}
			/>
			<Button onClick={() => {}} className={defaultStyles['submit-button']}>
				Save
			</Button>
		</form>
	)
}
