import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import { ResetPasswordModalProps as Props } from './types/ResetPassword.modal'

import Modal from '@/components/UI/Modal'
import ResetPasswordForm from './ResetPasswordForm'

export default function ResetPasswordModal(props: Props) {
	const { getText } = useAppContext().Language

	function onSubmit(email: string) {
		props.setShowModal(false)
		props.onPasswordReset(email)
	}
	return (
		<Modal show={props.showModal} title={getText('Reset password')} getState={props.setShowModal} allowClosing>
			<ResetPasswordForm onSubmit={onSubmit} />
		</Modal>
	)
}
