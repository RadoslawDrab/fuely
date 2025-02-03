import { UserObject } from '@/pages/api/data/types/index.modal'
import { Events } from '../../Events/types/Events.modal'

export type Actions = SetUser | LogOut | SetError | SetLoading | SetEvents

interface SetUser {
	type: 'SET_USER'
	user: UserObject
}
interface LogOut {
	type: 'LOG_OUT'
}
interface SetError {
	type: 'SET_ERROR'
	errorMessage: string | undefined
}
interface SetLoading {
	type: 'SET_LOADING'
	state: boolean
}
interface SetEvents {
	type: 'SET_EVENTS'
	events: Events
}

export interface State {
	state: AuthState
	user: UserState
}

export interface AuthState {
	isLoading: boolean
	isLoggedIn: boolean
	hasError: boolean
	hasVehicles: boolean
	errorMessage: string
}

export interface UserState extends UserObject {
	events: Events
}
