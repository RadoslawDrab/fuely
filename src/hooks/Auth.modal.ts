import { User } from '@/pages/api/auth'

export interface Auth {
	isLoggedIn: boolean
	isLoading: boolean
	user: User | null
	hasError: boolean
	errorMessage: string
	login: (login: string, password: string) => Promise<any>
	register: (login: string, password: string) => Promise<any>
	loginUsingToken: (token: string) => void
	logout: () => void
}
