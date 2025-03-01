import { Currencies } from '@/utils/currency'

export interface Event {
	cost: number
	fuel: number
	odometer: number
	currency: Currencies
	vehicleId: string | null
}
export interface FullEvent extends Event {
	id: number
	date: string
	fullId: string
	distance: number
}
export interface Events {
	[date: string]: Event
}
export interface EventObject {
	events: Events
	sortedDates: string[]
	isLoading: boolean
	emptyEvent: FullEvent
	getEvent: (index: number, datesArray?: string[]) => Promise<FullEvent | null>
	getEventById: (eventId: string) => Promise<FullEvent | null>
	removeEvent: (eventId: string) => Promise<void>
	editEvent: (eventId: string, event: Partial<Event>) => Promise<void>
	getDistance: (eventId: string) => Promise<number>
}
export interface CalculateData {
	name: string
	unitType: string
	value: number
	decimals?: number
}
