export interface Props {
	onRegister: (login: string, password: string) => void
	onError: (errorMessage: string) => void
	onInputChange: () => void
}
