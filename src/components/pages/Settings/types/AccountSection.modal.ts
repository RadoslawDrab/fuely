import { SettingsFormsError, SettingsFormsLoading } from '@/pages/settings'

export interface AccountSectionProps {
	onError: (type: keyof SettingsFormsError, error: string | null) => void
	onEmailChange: (newEmail: string) => void
	onPasswordChange: (newPassword: string) => void
	errorWith: SettingsFormsError
	isLoading: SettingsFormsLoading
}
export interface EmailChangeFormProps {
	onEmailChange: (newEmail: string) => void
	onError: (error: string | null) => void
}
export interface PasswordChangeFormProps {
	onPasswordChange: (newPassword: string) => void
	onError: (error: string | null) => void
}
