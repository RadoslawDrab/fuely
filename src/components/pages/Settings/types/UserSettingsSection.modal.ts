import { Units } from '@/pages/api/data/types/index.modal'
import { FormData } from '@/pages/settings'
import { Currencies } from '@/utils/currency'

export interface UserSettingsSectionProps {
	isLoading: boolean
	onError: (error: string) => void
	onUserSettingsFormSubmit: (formData: Partial<FormData>) => void
}

export interface UserSettingsFormProps {
	onFormSubmit: (newDisplayName: string | null, newUnit: Units | null, newCurrency: Currencies | null) => void
	onError: (error: string) => void
}
export interface UserSettingsFormSettings {
	displayName: string | null
	units: Units | null
	currency: Currencies | null
}
