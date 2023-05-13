export interface Auth {
	isLoggedIn: boolean
	token: string
	user: object
	login: (login: string, password: string) => void
	register: (login: string, password: string) => void
	loginUsingToken: (token: string) => void
	logout: () => void
}
