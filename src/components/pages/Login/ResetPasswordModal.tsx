import React from 'react'

import { ResetPasswordModalProps as Props } from './types/ResetPassword.modal'

import Modal from '@/components/UI/Modal'
import ResetPasswordForm from './ResetPasswordForm'

export default function ResetPasswordModal(props: Props) {
	function onSubmit(email: string) {
		props.setShowModal(false)
		props.onPasswordReset(email)
	}
	return (
		<Modal show={props.showModal} title="Reset password" getState={props.setShowModal} allowClosing>
			<ResetPasswordForm onSubmit={onSubmit} />
		</Modal>
	)
}
