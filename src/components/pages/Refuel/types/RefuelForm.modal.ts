import { Currencies } from '@/utils/currency'

export interface RefuelFormProps {
	onSubmit: (data: RefuelFormData) => void
	default?: Partial<RefuelFormData>
}
export interface RefuelFormData {
	cost: number
	currency: Currencies
	fuel: number
	odometer: number
	date: string
}
