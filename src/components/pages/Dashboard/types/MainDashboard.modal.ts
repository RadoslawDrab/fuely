import { FullEvent } from '@/hooks/Events/types/Events.modal'

export interface MainDashboardItemsProps {
	events: FullEvent[]
}
export interface MainDashboardItem {
	id: string
	date: string
	cost: number
	costUnit: string
	fuel: number
	fuelUnit: string
}

export interface MainDashboardProps {
	className?: string
}
