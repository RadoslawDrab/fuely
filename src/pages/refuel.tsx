import React, { useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import useUserRedirect from '@/hooks/Other/use-user-redirect'
import usePages from '@/hooks/Pages/use-pages'
import { className } from '@/utils'
import { getMessage } from '@/utils/messages'

import { RefuelFormData } from '@/components/pages/Refuel/types/RefuelForm.modal'
import { Status } from './api/data/types/index.modal'

import Head from '@/components/Head'
import Section from '@/components/Layout/Section'
import LoadingIcon from '@/components/UI/LoadingIcon'
import RefuelForm from '@/components/pages/Refuel/RefuelForm'
import VehicleSelector from '@comp/Layout/Dashboard/VehicleSelector.tsx'

import styles from '@styles/styles.module.scss'

export default function Refuel() {
	const { redirect } = usePages()
	useUserRedirect()
	const { getEvents } = useAppContext().Auth
	const { getText } = useAppContext().Language
	const { addNotification } = useAppContext().Notification
	const { currentVehicle } = useAppContext().Vehicle

	const [isLoading, setIsLoading] = useState(false)

	const sectionStyles = className(styles.section, styles.center)

	async function onSubmit(data: RefuelFormData | null) {
		if (!currentVehicle) {
			return addNotification({type: 'error', content: getMessage('no-vehicle-selected').text})
		}
		if (!data || !currentVehicle) {
			return addNotification({ type: 'error', content: getMessage('not-enough-data').text })
		}
		setIsLoading(true)

		const response = await fetch('/api/user/refuel', {
			method: 'POST',
			body: JSON.stringify({ ...data, vehicleId: currentVehicle.id }),
		})

		if (!response.ok) {
			const error: Status = await response.json()

			addNotification({ type: 'error', content: getMessage(error.code).text })
			setIsLoading(() => false)
			return
		}

		try {
			await getEvents()
			redirect('/dashboard')
		} catch (error: any) {
			addNotification({
				type: 'error',
				content: getMessage(error.code).text
			})
		} finally {
			addNotification({ type: 'success', content: getMessage('event-added').text })
			setIsLoading(() => false)
		}
	}

	return (
		<>
			<Head title={`Fuely | ${getText('Refuel')}`} description="Fuely refuel form page" />
			<Section title={getText('Refuel')} className={sectionStyles} disableContent={isLoading}>
				<VehicleSelector />
				<RefuelForm onSubmit={onSubmit} />
			</Section>
			{isLoading && <LoadingIcon type="car" center />}
		</>
	)
}
