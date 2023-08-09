import { Units } from '@/pages/api/data/types/index.modal'
import { FormData } from '@/pages/settings'
import { Currencies } from '@/utils/currency'

export interface PreferencesSectionProps {
	isLoading: boolean
	onError: (error: string) => void
	onPreferencesFormSubmit: (formData: Partial<FormData>) => void
}

export interface PreferencesFormProps {
	onFormSubmit: (newDisplayName: string | null, newUnit: Units | null, newCurrency: Currencies | null) => void
	onError: (error: string) => void
}
export interface PreferencesFormSettings {
	displayName: string | null
	units: Units | null
	currency: Currencies | null
}
