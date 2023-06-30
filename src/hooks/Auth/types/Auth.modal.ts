import { Status } from '@/pages/api/data/types/index.modal'
import { AuthState, UserState } from './authReducer.modal'

export interface Auth {
	state: AuthState
	user: UserState

	login: (email: string, password: string) => Promise<Status>
	register: (email: string, password: string, name: string) => Promise<Status>
	loginUsingToken: () => void
	logout: () => Promise<Status>
	getEvents: () => Promise<void>
}
