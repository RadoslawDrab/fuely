import { useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import useUserRedirect from '@/hooks/Other/use-user-redirect'
import { Currencies } from '@/utils/currency'
import { getMessage } from '@/utils/messages'

import { Units } from './api/data/types/index.modal'

import Head from '@/components/Head'
import AccountSection from '@/components/pages/Settings/Account/AccountSection'
import PreferencesSection from '@/components/pages/Settings/Preferences/PreferencesSection'
import LoadingIcon from '@/components/UI/LoadingIcon'

export default function Settings() {
	useUserRedirect()

	const {
		user,
		loginUsingToken,
		state: { isLoading: authIsLoading }
	} = useAppContext().Auth
	const { addNotification } = useAppContext().Notification

	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function onFormSubmit(formData: Partial<FormData>) {
		if (!Object.values(formData).find((data) => data !== null)) return

		setIsLoading(true)

		try {
			const body = {
				displayName: formData.newDisplayName,
				units: formData.newUnit,
				currency: formData.newCurrency,
				email: formData.newEmail,
				password: formData.newPassword
			}

			const response = await fetch('/api/user/update', {
				method: 'PATCH',
				body: JSON.stringify(body)
			})
			if (!response.ok) {
				const error = await response.json()
				onError(error.code)
				return
			}
			await response.json()
			loginUsingToken()
			addNotification({ type: 'success', content: getMessage('user-updated').text })
		} finally {
			setIsLoading(false)
		}
	}

	function onError(err: string) {
		addNotification({ type: 'error', content: getMessage(err).text })
	}

	if (authIsLoading) {
		return <LoadingIcon center type="car" />
	}

	return (
		<>
			<Head title={`Fuely | Settings - ${user.displayName}`} description={`${user.displayName} settings page`} />
			<AccountSection onAccountFormSubmit={onFormSubmit} onError={onError} isLoading={isLoading} />
			<PreferencesSection onPreferencesFormSubmit={onFormSubmit} onError={onError} isLoading={isLoading} />
		</>
	)
}

export interface FormData {
	newDisplayName: string | null
	newUnit: Units | null
	newCurrency: Currencies | null
	newEmail: string | null
	newPassword: string | null
}
