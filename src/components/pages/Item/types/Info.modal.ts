import { EventSiblings } from '@/pages/[eventId]'
import { CalculateData } from '@/hooks/Events/types/Events.modal'

export interface InfoProps {
	events: EventSiblings
}
export interface InfoItemProps {
	item: CalculateData
	items: { unit: string; value: string; date: string; isCurrent: boolean; percent: number }[]
}
