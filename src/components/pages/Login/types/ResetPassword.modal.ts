export interface ResetPasswordModalProps {
	showModal: boolean
	setShowModal: (state: boolean) => void
	onPasswordReset: (resetEmail: string) => void
}
export interface ResetPasswordFormProps {
	onSubmit: (email: string) => void
}
