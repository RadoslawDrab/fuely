import { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'
import { className } from '@/utils'

import Head from '@/components/Head'
import LoadingIcon from '@/components/UI/LoadingIcon'
import Section from '@/components/Layout/Section'
import SettingsForm from '@/components/pages/Settings/SettingsForm'
import AccountForm from '@/components/pages/Settings/AccountForm'
import Error from '@/components/UI/Error'

import defaultStyles from '@styles/styles.module.scss'
import styles from '@styles/pages/Settings/index.module.scss'

export default function Settings() {
	useUserRedirect()

	const { getText } = useAppContext().Language

	const [accountError, setAccountError] = useState<string | null>(null)
	const [settingsError, setSettingsError] = useState<string | null>(null)

	const accountSectionStyles = className(defaultStyles.section, styles.section)
	const settingsSectionStyles = className(defaultStyles.section, styles.section)

	const {
		user,
		state: { isLoading }
	} = useAppContext().Auth

	if (isLoading) {
		return <LoadingIcon />
	}

	function onEmailChange(newEmail: string) {
		console.log(newEmail)
	}
	function onPasswordChange(newPassword: string) {}

	function onDisplayNameChange(newDisplayName: string) {}
	function onUnitChange(newUnit: string) {}
	function onCurrencyChange(newCurrency: string) {}

	return (
		<>
			<Head title={`Fuely | Settings - ${user.displayName}`} description={`${user.displayName} settings page`} />
			<Section title={getText('Account')} contentClassName={accountSectionStyles}>
				<AccountForm onEmailChange={onEmailChange} onPasswordChange={onPasswordChange} onError={(err) => setAccountError(err)} />
				<Error show={accountError !== null} text={accountError ? accountError : ''} />
			</Section>
			<Section title={getText('Settings')} contentClassName={settingsSectionStyles}>
				<SettingsForm
					onSubmit={(user, unit, currency) => {
						console.log(user, unit, currency)
					}}
					onError={() => {}}
				/>
				<Error show={settingsError !== null} text={settingsError ? settingsError : ''} />
			</Section>
		</>
	)
}
