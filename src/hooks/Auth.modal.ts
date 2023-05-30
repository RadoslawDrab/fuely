import { UserSettings } from '@/pages/api/auth'
import { Events } from './Events.modal'

export interface Auth {
	isLoggedIn: boolean
	isLoading: boolean
	user: UserSettings | null
	userId: string
	hasError: boolean
	errorMessage: string
	events: Events
	login: (login: string, password: string) => Promise<any>
	register: (login: string, password: string, name: string) => Promise<any>
	loginUsingToken: (token: string) => void
	logout: () => void
}
