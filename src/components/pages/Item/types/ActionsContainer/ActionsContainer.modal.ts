import { FullEvent } from '@/hooks/Events/types/Events.modal'
import { RefuelFormData } from '../../../Refuel/types/RefuelForm.modal'

export interface ActionsContainerProps {
	currentEvent: FullEvent
	onEventEdit: (data: RefuelFormData | null, vehicleId: string | null) => void
	onEventRemove: () => void
}
