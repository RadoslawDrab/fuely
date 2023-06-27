import { SettingsFormsError, SettingsFormsLoading } from '@/pages/settings'

export interface UserSettingsSectionProps {
	onError: (type: keyof SettingsFormsError, error: string | null) => void
	onSettingsFormSubmit: (newDisplayName: string | null, newUnit: string | null, newCurrency: string | null) => void
	errorWith: SettingsFormsError
	isLoading: SettingsFormsLoading
}

export interface UserSettingsFormProps {
	onSubmit: (newDisplayName: string | null, newUnit: string | null, newCurrency: string | null) => void
	onError: (error: string | null) => void
}
export interface UserSettingsFormSettings {
	displayName: string | null
	units: string | null
	currency: string | null
}
