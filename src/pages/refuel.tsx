import { useRouter } from 'next/router'
import React, { useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import useUserRedirect from '@/hooks/Other/use-user-redirect'
import { className, setSessionStorage } from '@/utils'
import { Status } from './api/auth/index.modal'
import { encrypt } from './api/_local'

import { Event } from '@/hooks/Events/types/Events.modal'

import Head from '@/components/Head'
import Section from '@/components/Layout/Section'
import Error from '@/components/UI/Error'
import LoadingIcon from '@/components/UI/LoadingIcon'
import RefuelForm from '@/components/pages/Refuel/RefuelForm'

import styles from '@styles/styles.module.scss'

const errorTypes: any = {
	'event/not-enough-data': 'Not enough data provided',
	'auth/no-user': 'User not logged in'
}
export default function Refuel() {
	useUserRedirect()
	const router = useRouter()

	const { getEvents } = useAppContext().Auth

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const sectionStyles = className(styles.section, styles.center)

	async function onSubmit(event: Event, date: string) {
		setError(() => '')
		setIsLoading(() => true)
		// Saves form data to sessionStorage to restore them after submiting failure
		setSessionStorage({ formData: event })
		const response = await fetch('/api/user/refuel', {
			method: 'POST',
			body: encrypt({
				...event,
				date
			})
		})

		if (!response.ok) {
			const error: Status = await response.json()

			setError(() => error.code)
			setIsLoading(() => false)
			return
		}

		getEvents()
			.then(() => {
				setSessionStorage({ formData: undefined })
				router.replace('/dashboard')
			})
			.catch((error) => {
				setError(() => error)
			})
			.finally(() => {
				setIsLoading(() => false)
			})
	}

	if (isLoading) {
		return <LoadingIcon />
	}

	return (
		<>
			<Head title="Fuely | Refuel" description="Fuely refuel form page" />
			<Section title="Refuel" className={sectionStyles}>
				<RefuelForm onSubmit={onSubmit} />
				<Error show={error !== ''} text={errorTypes[error]} />
			</Section>
		</>
	)
}
