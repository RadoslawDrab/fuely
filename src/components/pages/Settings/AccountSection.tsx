import React, { useRef } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { className } from '@/utils'

import { AccountSectionProps as Props } from './types/AccountSection.modal'

import Section from '@/components/Layout/Section'
import LoadingIcon from '@/components/UI/LoadingIcon'
import AccountForm from './AccountForm'

import styles from '@styles/pages/Settings/index.module.scss'
import defaultStyles from '@styles/styles.module.scss'

export default function AccountSection(props: Props) {
	const { getText } = useAppContext().Language

	const sectionRef = useRef(null)

	const sectionStyles = className(defaultStyles.section, styles.section, 'not-grow')

	function onFormSubmit(newEmail: string | null, newPassword: string | null) {
		props.onAccountFormSubmit({
			newEmail,
			newPassword
		})
	}
	return (
		<Section ref={sectionRef} title={getText('Account')} contentClassName={sectionStyles} disableContent={props.isLoading}>
			<AccountForm onError={props.onError} onFormSubmit={onFormSubmit} />
			{props.isLoading && <LoadingIcon parent={sectionRef} center />}
		</Section>
	)
}
