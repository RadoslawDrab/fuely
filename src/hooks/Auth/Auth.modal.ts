import { Status } from '@/pages/api/auth'
import { AuthState, UserState } from './AuthReducer.modal'

export interface Auth {
	state: AuthState
	user: UserState

	login: (login: string, password: string) => Promise<Status>
	register: (login: string, password: string, name: string) => Promise<Status>
	loginUsingToken: () => void
	logout: () => Promise<Status>
}
