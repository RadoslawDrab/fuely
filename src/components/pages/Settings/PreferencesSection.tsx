import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { className } from '@/utils'

import { Units } from '@/pages/api/data/types/index.modal'
import { Currencies } from '@/utils/currency'
import { PreferencesSectionProps as Props } from './types/PreferencesSection.modal'

import Section from '@/components/Layout/Section'
import LoadingIcon from '@/components/UI/LoadingIcon'
import PreferencesForm from './PreferencesForm'

import styles from '@styles/pages/Settings/index.module.scss'
import defaultStyles from '@styles/styles.module.scss'

export default function PreferencesSection(props: Props) {
	const { getText } = useAppContext().Language

	const sectionStyles = className(defaultStyles.section, styles.section, 'not-grow')
	function onFormSubmit(newDisplayName: string | null, newUnit: Units | null, newCurrency: Currencies | null) {
		props.onPreferencesFormSubmit({
			newDisplayName,
			newUnit,
			newCurrency
		})
	}
	return (
		<Section title={getText('Preferences')} contentClassName={sectionStyles} disableContent={props.isLoading}>
			<PreferencesForm onFormSubmit={onFormSubmit} onError={props.onError} />
			{props.isLoading && <LoadingIcon center />}
		</Section>
	)
}
