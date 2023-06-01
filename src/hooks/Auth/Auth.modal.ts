import { Status } from '@/pages/api/auth'
import { AuthState, UserState } from './AuthReducer.modal'

export interface Auth {
	state: AuthState
	user: UserState

	login: (login: string, password: string) => Promise<string>
	register: (login: string, password: string, name: string) => Promise<Status>
	loginUsingToken: (token: string) => void
	logout: () => void
}
