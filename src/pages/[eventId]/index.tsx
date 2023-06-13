import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { FullEvent } from '@/hooks/Events.modal'
import useAppContext from '@/hooks/use-app-context'
import useEvents from '@/hooks/use-events'
import useUserRedirect from '@/hooks/use-user-redirect'

import Head from '@/components/Head'
import LoadingIcon from '@/components/UI/LoadingIcon'

export default function Item() {
	const router = useRouter()

	useUserRedirect()
	const {
		state: { isLoading }
	} = useAppContext().Auth
	const { getEventById } = useEvents()

	const [event, setEvent] = useState<FullEvent | null>(null)

	const eventId: any = router.query.eventId

	useEffect(() => {
		if (eventId) {
			getEventById(eventId)
				.then((event) => setEvent(() => event))
				.catch(() => setEvent(() => null))
		}
	}, [eventId, getEventById])

	if (isLoading || !event) {
		return <LoadingIcon />
	}
	return (
		<>
			<Head title={`Fuely | ${event.date}`} description={`Fuely ${event.date} event page`} />
			Item - {event.date}
		</>
	)
}
