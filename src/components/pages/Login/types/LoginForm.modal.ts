export interface LoginFormProps {
	onLogin: (email: string, password: string) => void
	onError: (message: string) => void
	onInputChange: () => void
}
