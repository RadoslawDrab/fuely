export interface Auth {
	isLoggedIn: false
	token: string
	login: (login: string, password: string) => void
	register: (login: string, password: string) => void
}
