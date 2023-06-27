import React, { useState } from 'react'

import { emailRegEx } from '@/utils'

import { EmailChangeFormProps as Props } from '../types/AccountSection.modal'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

import defaultStyles from '@styles/styles.module.scss'

export default function EmailChangeForm(props: Props) {
	const [email, setEmail] = useState<string | null>(null)

	function onEmailChange(e: React.MouseEvent<HTMLFormElement>) {
		e.preventDefault()
		props.onError(null)
		if (!email) {
			return props.onError('Invalid email')
		} else {
			props.onEmailChange(email)
		}
	}
	return (
		<form className={defaultStyles.form} onSubmit={onEmailChange}>
			<FormInput
				id="email"
				text="Email"
				type="email"
				getValue={() => props.onError(null)}
				getValueOnBlur={(value) => setEmail(value)}
				defaultValue={email}
				check={(value) => !!value.match(emailRegEx)}
				errorText="Enter valid email"
			/>
			<Button onClick={() => {}} className={defaultStyles['submit-button']}>
				Save
			</Button>
		</form>
	)
}
