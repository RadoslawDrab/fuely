export interface RegisterFormProps {
	onRegister: (email: string, password: string, name: string) => void
	onError: (errorMessage: string) => void
	onInputChange: () => void
}
