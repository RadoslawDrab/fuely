import { Currencies } from '@/utils/currency'

export interface UserData {
	displayName: string
	email: string | null
}
export interface UserSettings {
	units: 'metric' | 'imperial'
	currency: Currencies
}
export interface UserObject extends UserData {
	settings: UserSettings
}

export interface Status {
	code: string
	message?: string
}
export interface ReturnObject<Type> {
	status: Status
	data?: Type
}
