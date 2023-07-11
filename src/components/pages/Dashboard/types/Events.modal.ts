import { FullEvent } from '@/hooks/Events/types/Events.modal'

export interface EventsItemsProps {
	events: FullEvent[]
}
export interface EventsItem {
	id: string
	date: string
	cost: number
	costUnit: string
	fuel: number
	fuelUnit: string
}

export interface EventsProps {
	className?: string
}
