import { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'
import { className } from '@/utils'

import Head from '@/components/Head'
import LoadingIcon from '@/components/UI/LoadingIcon'
import Section from '@/components/Layout/Section'
import Error from '@/components/UI/Error'
import SettingsForm from '@/components/pages/Settings/SettingsForm'
import EmailChangeForm from '@/components/pages/Settings/EmailChangeForm'
import PasswordChangeForm from '@/components/pages/Settings/PasswordChangeForm'

import defaultStyles from '@styles/styles.module.scss'
import styles from '@styles/pages/Settings/index.module.scss'

interface Error {
	email: string | null
	password: string | null
	settings: string | null
}
export default function Settings() {
	useUserRedirect()

	const { getText } = useAppContext().Language
	const {
		user,
		state: { isLoading }
	} = useAppContext().Auth

	const [errorWith, setErrorWith] = useState<Error>({
		email: null,
		password: null,
		settings: null
	})

	const accountSectionStyles = className(defaultStyles.section, styles.section, 'not-grow')
	const settingsSectionStyles = className(defaultStyles.section, styles.section, 'not-grow')

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
			<Section title={getText('Account')} contentClassName={accountSectionStyles}>
				<EmailChangeForm onEmailChange={onEmailChange} onError={(error) => onError('email', error)} />
				<Error show={errorWith.email !== null} text={errorWith.email ? errorWith.email : ''} />
				<hr />
				<PasswordChangeForm onPasswordChange={onPasswordChange} onError={(error) => onError('password', error)} />
				<Error show={errorWith.password !== null} text={errorWith.password ? errorWith.password : ''} />
			</Section>
			<Section title={getText('Settings')} contentClassName={settingsSectionStyles}>
				<SettingsForm onSubmit={onSettingsFormSubmit} onError={(error) => onError('settings', error)} />
				<Error show={errorWith.settings !== null} text={errorWith.settings ? errorWith.settings : ''} />
			</Section>
		</>
	)
}
