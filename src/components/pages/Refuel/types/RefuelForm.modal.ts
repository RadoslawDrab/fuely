import { Event } from '@/hooks/Events/types/Events.modal'

export interface RefuelFormProps {
	onSubmit: (event: Event, date: string) => void
}
