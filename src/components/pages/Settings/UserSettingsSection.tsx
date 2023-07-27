import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { className } from '@/utils'

import { Units } from '@/pages/api/data/types/index.modal'
import { Currencies } from '@/utils/currency'
import { UserSettingsSectionProps as Props } from './types/UserSettingsSection.modal'

import Section from '@/components/Layout/Section'
import LoadingIcon from '@/components/UI/LoadingIcon'
import UserSettingsForm from './UserSettingsSection/UserSettingsForm'

import styles from '@styles/pages/Settings/index.module.scss'
import defaultStyles from '@styles/styles.module.scss'

export default function UserSettingsSection(props: Props) {
	const { getText } = useAppContext().Language

	const sectionStyles = className(defaultStyles.section, styles.section, 'not-grow')
	function onFormSubmit(newDisplayName: string | null, newUnit: Units | null, newCurrency: Currencies | null) {
		props.onUserSettingsFormSubmit({
			newDisplayName,
			newUnit,
			newCurrency
		})
	}
	return (
		<Section title={getText('Settings')} contentClassName={sectionStyles} disableContent={props.isLoading}>
			<UserSettingsForm onFormSubmit={onFormSubmit} onError={props.onError} />
			{props.isLoading && <LoadingIcon center />}
		</Section>
	)
}
