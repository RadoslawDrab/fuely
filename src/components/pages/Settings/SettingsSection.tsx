import React from 'react'

import useAppContext from '@/hooks/use-app-context'
import { SettingsFormsError } from '@/pages/settings'
import { className } from '@/utils'

import Section from '@/components/Layout/Section'
import Error from '@/components/UI/Error'
import SettingsForm from './SettingsSection/SettingsForm'

import styles from '@styles/pages/Settings/index.module.scss'
import defaultStyles from '@styles/styles.module.scss'

interface Props {
	onError: (type: keyof SettingsFormsError, error: string | null) => void
	onSettingsFormSubmit: (newDisplayName: string | null, newUnit: string | null, newCurrency: string | null) => void
	errorWith: SettingsFormsError
}
export default function SettingsSection(props: Props) {
	const { getText } = useAppContext().Language

	const sectionStyles = className(defaultStyles.section, styles.section, 'not-grow')
	return (
		<Section title={getText('Settings')} contentClassName={sectionStyles}>
			<SettingsForm onSubmit={props.onSettingsFormSubmit} onError={(error) => props.onError('settings', error)} />
			<Error show={props.errorWith.settings !== null} text={props.errorWith.settings ? props.errorWith.settings : ''} />
		</Section>
	)
}
