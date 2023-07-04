export interface UserData {
	displayName: string
	email: string | null
}
export interface UserSettings {
	units: 'metric' | 'imperial'
	currency: string
}
export interface UserObject extends UserData {
	settings: UserSettings
}

export interface Status {
	code: string
	message?: string
}
