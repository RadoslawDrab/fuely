import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { SettingsFormsError, SettingsFormsLoading } from '@/pages/settings'
import { className } from '@/utils'

import Section from '@/components/Layout/Section'
import Error from '@/components/UI/Error'
import UserSettingsForm from './UserSettingsSection/UserSettingsForm'
import LoadingIcon from '@/components/UI/LoadingIcon'

import styles from '@styles/pages/Settings/index.module.scss'
import defaultStyles from '@styles/styles.module.scss'

interface Props {
	onError: (type: keyof SettingsFormsError, error: string | null) => void
	onSettingsFormSubmit: (newDisplayName: string | null, newUnit: string | null, newCurrency: string | null) => void
	errorWith: SettingsFormsError
	isLoading: SettingsFormsLoading
}
export default function UserSettingsSection(props: Props) {
	const { getText } = useAppContext().Language

	const sectionStyles = className(defaultStyles.section, styles.section, 'not-grow')
	return (
		<Section title={getText('Settings')} contentClassName={sectionStyles}>
			<UserSettingsForm onSubmit={props.onSettingsFormSubmit} onError={(error) => props.onError('settings', error)} />
			<Error show={props.errorWith.settings !== null} text={props.errorWith.settings ? props.errorWith.settings : ''} />
			{props.isLoading.settings && <LoadingIcon center />}
		</Section>
	)
}
