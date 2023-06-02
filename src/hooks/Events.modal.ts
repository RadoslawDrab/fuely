import { UnitType } from './use-unit'

export interface Event {
	cost: number
	fuel: number
	distance: number
	odometer: number
	currency: string
}
export interface FullEvent extends Event {
	date: string
}
export interface Events {
	[date: string]: Event
}
export interface EventObject {
	events: Events
	sortedDates: string[]
	isLoading: boolean
	emptyEvent: FullEvent
	getEvent: (index: number) => Promise<FullEvent>
	formatDate: (date: string) => string
	convert: (value: number, type: UnitType) => number
	convertIfImperial: (value: number, type: UnitType) => number
}
