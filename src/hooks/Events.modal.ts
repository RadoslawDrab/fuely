export interface Event {
	cost: number
	fuel: number
	fuelPercent: number
	distance: number
	odometer: number
	currency: string
}
export interface FullEvent extends Event {
	id: number
	date: string
	fullId: string
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
	getEventById: (eventId: string) => Promise<FullEvent>
	formatDate: (date: string) => string
}
