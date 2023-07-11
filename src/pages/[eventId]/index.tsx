import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import useEvents from '@/hooks/Events/use-events'
import useUserRedirect from '@/hooks/Other/use-user-redirect'

import { FullEvent } from '@/hooks/Events/types/Events.modal'

import Head from '@/components/Head'
import LoadingIcon from '@/components/UI/LoadingIcon'
import Info from '@/components/pages/Item/Info'
import RemoveButton from '@/components/pages/Item/RemoveButton'

export type EventSiblings = [FullEvent | null, FullEvent | null, FullEvent, FullEvent | null, FullEvent | null]
export default function Item() {
	const router = useRouter()

	useUserRedirect()
	const {
		state: { isLoading: userIsLoading },
		getEvents
	} = useAppContext().Auth
	const { getEventById, sortedDates, emptyEvent, removeEvent } = useEvents()

	const [events, setEvents] = useState<EventSiblings>([null, null, emptyEvent, null, null])
	const [isLoading, setIsLoading] = useState(false)

	const eventId: any = router.query.eventId

	useEffect(() => {
		if (eventId) {
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
				Promise.all(eventsPromises).then((events) => {
					const e: any = events
					setEvents(e)
				})
			}
		}
	}, [eventId, getEventById, sortedDates])

	function onEventRemove() {
		setIsLoading(true)
		removeEvent(eventId)
			.then(async () => {
				await getEvents()
				router.replace('/dashboard')
			})
			.catch(() => {})
			.finally(() => {
				setIsLoading(false)
			})
	}
	if (userIsLoading || isLoading || events.length !== 5 || !events[2]) {
		return <LoadingIcon type="car" />
	}
	return (
		<>
			<Head title={`Fuely | ${events[2].date}`} description={`Fuely ${events[2].date} event page`} />
			<Info events={events} />
			<RemoveButton onClick={onEventRemove} event={events[2].date} />
		</>
	)
}
