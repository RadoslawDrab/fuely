import { AuthState, UserState } from './AuthReducer.modal'

export interface Auth {
	state: AuthState
	user: UserState

	login: (login: string, password: string) => Promise<any>
	register: (login: string, password: string, name: string) => Promise<any>
	loginUsingToken: (token: string) => void
	logout: () => void
}
