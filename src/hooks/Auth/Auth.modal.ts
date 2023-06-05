import { Status } from '@/pages/api/auth'
import { AuthState, UserState } from './AuthReducer.modal'

export interface Auth {
	state: AuthState
	user: UserState

	login: (email: string, password: string) => Promise<Status>
	register: (email: string, password: string, name: string) => Promise<Status>
	loginUsingToken: () => void
	logout: () => Promise<Status>
}
