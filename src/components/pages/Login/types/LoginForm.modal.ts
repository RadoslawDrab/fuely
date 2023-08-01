export interface LoginFormProps {
	onLogin: (email: string, password: string) => void
	onError: (message: string) => void
	onPasswordReset: (resetPassword: string) => void
}
