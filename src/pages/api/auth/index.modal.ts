export interface UserData {
	displayName: string
	email: string | null
}
export interface UserObject extends UserData {
	settings: UserSettings
}

export interface UserSettings {
	units: 'metric' | 'imperial'
	currency: string
}

export interface Status {
	code: string
	message?: string
}
export interface ReturnObject<Type> {
	status: Status
	data?: Type
}

export type EncryptionKey = 'token' | 'data'
