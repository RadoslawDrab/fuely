import { Currencies } from '@/utils/currency'

export const units = ['metric', 'imperial'] as const
export type Units = (typeof units)[number]

export interface UserData {
	displayName: string
	email: string | null
}
export interface UserSettings {
	units: Units
	currency: Currencies
	vehicles: Vehicle[]
}
export interface UserObject extends UserData {
	settings: UserSettings
}
export interface Vehicle {
	id: string
	name: string
}

export interface Status {
	code: string
	message?: string
}
export interface ReturnObject<Type> {
	status: Status
	data?: Type
}
