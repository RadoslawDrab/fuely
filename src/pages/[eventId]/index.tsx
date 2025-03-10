import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import useEvents from '@/hooks/Events/use-events'
import useAppContext from '@/hooks/Other/use-app-context'
import useUserRedirect from '@/hooks/Other/use-user-redirect'
import usePages from '@/hooks/Pages/use-pages'

import { RefuelFormData } from '@/components/pages/Refuel/types/RefuelForm.modal'
import { FullEvent } from '@/hooks/Events/types/Events.modal'

import Head from '@/components/Head'
import LoadingIcon from '@/components/UI/LoadingIcon'
import ActionsContainer from '@/components/pages/Item/ActionsContainer/ActionsContainer'
import Info from '@/components/pages/Item/Info/Info'

export type EventSiblings = [FullEvent | null, FullEvent | null, FullEvent, FullEvent | null, FullEvent | null]
export default function Item() {
	const router = useRouter()

	const { redirect } = usePages()
	useUserRedirect()
	const {
		state: { isLoading: userIsLoading },
		getEvents
	} = useAppContext().Auth
	const { getEventById, sortedDates, emptyEvent, removeEvent, editEvent } = useEvents()
	const vehicle = useAppContext().Vehicle

	const [events, setEvents] = useState<EventSiblings>([null, null, emptyEvent, null, null])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const eventId: string = useMemo(
		() => (typeof router.query.eventId === 'string' ? router.query.eventId : ''),
		[router.query.eventId]
	)

	useEffect(() => {
		if (eventId) {
			setIsLoading(true)
			// Current event index
			const eventIndex = sortedDates.findIndex((date) => date == eventId)

			if (eventIndex >= 0 && eventIndex < sortedDates.length) {
				const eventsPromises = []
				// Adds event promises to `eventsPromises` array with 2 previous events and 2 next events
				for (let i = -2; i <= 2; i++) {
					const date = sortedDates[eventIndex + i]
					eventsPromises.push(date ? getEventById(date) : null)
				}
				// Resolves all event promises and sets events object
				Promise.all(eventsPromises)
					.then((events) => {
						const e: any = events
						setEvents(e)
					})
					.finally(() => {
						setIsLoading(false)
					})
			}
		}
	}, [eventId, getEventById, sortedDates])

	async function onEventEdit(data: RefuelFormData | null, vehicleId: string | null) {
		setIsLoading(true)

		await editEvent(currentEvent.fullId, {
			...data,
			vehicleId,
		})
		await getEvents()
		if (vehicleId !== currentEvent.vehicleId) {
			vehicle.changeVehicle(vehicleId)
			await redirect('/dashboard')
		}
		// Fetching

		setIsLoading(false)
	}
	function onEventRemove() {
		setIsLoading(true)
		removeEvent(eventId)
			.then(async () => {
				await getEvents()
				await redirect('/dashboard')
			})
			.catch(() => {})
			.finally(() => {
				setIsLoading(false)
			})
	}

	if (userIsLoading || isLoading || events.length !== 5 || !events[2]) {
		return <LoadingIcon center type="car" />
	}
	const currentEvent = events[2]

	return (
		<>
			<Head title={`Fuely | ${currentEvent.date}`} description={`Fuely ${currentEvent.date} event page`} />
			<Info events={events} />
			<ActionsContainer currentEvent={currentEvent} onEventEdit={onEventEdit} onEventRemove={onEventRemove} />
		</>
	)
}
