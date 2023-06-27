import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { className } from '@/utils'

import { UserSettingsSectionProps as Props } from './types/UserSettingsSection.modal'

import Section from '@/components/Layout/Section'
import Error from '@/components/UI/Error'
import UserSettingsForm from './UserSettingsSection/UserSettingsForm'
import LoadingIcon from '@/components/UI/LoadingIcon'

import styles from '@styles/pages/Settings/index.module.scss'
import defaultStyles from '@styles/styles.module.scss'

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
