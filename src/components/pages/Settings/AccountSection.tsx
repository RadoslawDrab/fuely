import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { className } from '@/utils'

import { AccountSectionProps as Props } from './types/AccountSection.modal'

import Section from '@/components/Layout/Section'
import Error from '@/components/UI/Error'
import EmailChangeForm from './AccountSection/EmailChangeForm'
import PasswordChangeForm from './AccountSection/PasswordChangeForm'
import LoadingIcon from '@/components/UI/LoadingIcon'

import styles from '@styles/pages/Settings/index.module.scss'
import defaultStyles from '@styles/styles.module.scss'

export default function AccountSection(props: Props) {
	const { getText } = useAppContext().Language

	const sectionStyles = className(defaultStyles.section, styles.section, 'not-grow')

	return (
		<Section title={getText('Account')} contentClassName={sectionStyles}>
			<EmailChangeForm onEmailChange={props.onEmailChange} onError={(error) => props.onError('email', error)} />
			<Error show={props.errorWith.email !== null} text={props.errorWith.email ? props.errorWith.email : ''} />
			{props.isLoading.email && <LoadingIcon center />}
			<hr />
			<PasswordChangeForm onPasswordChange={props.onPasswordChange} onError={(error) => props.onError('password', error)} />
			<Error show={props.errorWith.password !== null} text={props.errorWith.password ? props.errorWith.password : ''} />
			{props.isLoading.password && <LoadingIcon center />}
		</Section>
	)
}
