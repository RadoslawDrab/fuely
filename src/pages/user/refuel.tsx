import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { FullEvent } from '@/hooks/Events.modal'
import useAppContext from '@/hooks/use-app-context'
import { className, setLocalStorage } from '@/utils'
import { Status } from '../api/auth'

import Section from '@/components/Layout/Section'
import RefuelForm from '@/components/pages/Refuel/RefuelForm'
import Error from '@/components/UI/Error'
import LoadingIcon from '@/components/UI/LoadingIcon'

import styles from '@styles/styles.module.scss'

const errorTypes: any = {
	'event/not-enough-data': 'Not enough data provided',
	'auth/no-user': 'User not logged in'
}
export default function NewEvent() {
	const router = useRouter()

	const { getEvents } = useAppContext().Auth

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const sectionStyles = className(styles.section, styles.center)

	async function onSubmit(event: FullEvent) {
		setError(() => '')
		setIsLoading(() => true)
		// Saves form data to localStorage to restore them after submiting failure
		setLocalStorage({ formData: event })
		const response = await fetch('/api/user/refuel', {
			method: 'POST',
			body: JSON.stringify({
				cost: event.cost,
				fuel: event.fuel,
				currency: event.currency,
				odometer: event.odometer,
				date: event.date
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
				setLocalStorage({ formData: undefined })
				router.replace('/user/dashboard')
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
		<Section title="Refuel" className={sectionStyles}>
			<RefuelForm onSubmit={onSubmit} />
			<Error show={error !== ''} text={errorTypes[error]} />
		</Section>
	)
}
