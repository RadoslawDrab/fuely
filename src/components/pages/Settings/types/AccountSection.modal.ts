import { FormData } from '@/pages/settings'

export interface AccountSectionProps {
	isLoading: boolean
	onError: (error: string) => void
	onAccountFormSubmit: (formData: Partial<FormData>) => void
}
export interface AccountFormProps {
	onError: (error: string) => void
	onFormSubmit: (newEmail: string | null, newPassword: string | null) => void
}
