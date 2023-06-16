import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { FullEvent } from '@/hooks/Events.modal'
import useAppContext from '@/hooks/use-app-context'
import useEvents from '@/hooks/use-events'
import useUserRedirect from '@/hooks/use-user-redirect'

import Head from '@/components/Head'
import LoadingIcon from '@/components/UI/LoadingIcon'
import Info from '@/components/pages/Item/Info'

export type EventSiblings = [FullEvent | null, FullEvent | null, FullEvent, FullEvent | null, FullEvent | null]
export default function Item() {
	const router = useRouter()

	useUserRedirect()
	const {
		state: { isLoading }
	} = useAppContext().Auth
	const { getEventById, sortedDates, emptyEvent } = useEvents()

	const [events, setEvents] = useState<EventSiblings>([null, null, emptyEvent, null, null])

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

	if (isLoading || events.length !== 5 || !events[2]) {
		return <LoadingIcon />
	}
	return (
		<>
			<Head title={`Fuely | ${events[2].date}`} description={`Fuely ${events[2].date} event page`} />
			<Info events={events} />
		</>
	)
}
