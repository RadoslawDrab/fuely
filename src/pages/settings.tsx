import { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import Head from '@/components/Head'
import LoadingIcon from '@/components/UI/LoadingIcon'
import AccountSection from '@/components/pages/Settings/AccountSection'
import UserSettingsSection from '@/components/pages/Settings/UserSettingsSection'

export interface SettingsFormsError {
	email: string | null
	password: string | null
	settings: string | null
}
export default function Settings() {
	useUserRedirect()

	const {
		user,
		state: { isLoading }
	} = useAppContext().Auth

	const [errorWith, setErrorWith] = useState<SettingsFormsError>({
		email: null,
		password: null,
		settings: null
	})

	if (isLoading) {
		return <LoadingIcon />
	}

	function onEmailChange(newEmail: string) {}
	function onPasswordChange(newPassword: string) {}

	function onSettingsFormSubmit(newDisplayName: string | null, newUnit: string | null, newCurrency: string | null) {}

	function onError(type: keyof typeof errorWith, err: string | null) {
		setErrorWith((prevError) => ({ ...prevError, [type]: err }))
	}
	return (
		<>
			<Head title={`Fuely | Settings - ${user.displayName}`} description={`${user.displayName} settings page`} />
			<AccountSection onEmailChange={onEmailChange} onPasswordChange={onPasswordChange} onError={onError} errorWith={errorWith} />
			<UserSettingsSection onSettingsFormSubmit={onSettingsFormSubmit} onError={onError} errorWith={errorWith} />
		</>
	)
}
