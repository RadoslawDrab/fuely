import { Currencies } from '@/utils/currency'

export interface RefuelFormProps {
	onSubmit: (data: RefuelFormData | null) => void
	default?: Partial<RefuelFormData>
}
export interface RefuelFormData {
	cost: number
	currency: Currencies
	fuel: number
	odometer: number
	date: string
}
