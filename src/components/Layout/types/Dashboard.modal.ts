import { FullEvent } from '@/hooks/Events/types/Events.modal'

export interface DashboardProps {
	name?: string
	className?: string
	children?: any
	onEventsLoad?: (events: FullEvent[]) => void
}
