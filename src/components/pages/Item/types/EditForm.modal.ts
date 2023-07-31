import { FullEvent } from '@/hooks/Events/types/Events.modal'
import { RefuelFormData } from '../../Refuel/types/RefuelForm.modal'

export interface EditFormProps {
	show: boolean
	currentEvent: FullEvent
	setShow: (state: boolean) => void
	onSubmit: (data: RefuelFormData) => void
}
