import { UserSettings } from '@/pages/api/auth'
import { Events } from '../Events.modal'

export type Actions = SetUser | LogOut | SetToken | SetError | SetLoading | SetEvents

interface SetUser {
	type: 'SET_USER'
	id: string
	user: UserSettings
}
interface LogOut {
	type: 'LOG_OUT'
}
interface SetToken {
	type: 'SET_TOKEN'
	token: string
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
	errorMessage: string
}

export interface UserState {
	id: string
	settings: UserSettings | null
	events: Events
}