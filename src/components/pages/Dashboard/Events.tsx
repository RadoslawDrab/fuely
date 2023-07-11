import React, { useCallback, useMemo, useState } from 'react'

import Dashboard from '@/components/Layout/Dashboard'
import EventsItems from '@/components/pages/Dashboard/EventsItems'

import { EventsProps as Props } from './types/Events.modal'
import { FullEvent } from '@/hooks/Events/types/Events.modal'

export default function Events(props: Props) {
	const [events, setEvents] = useState<FullEvent[]>([])

	const items: any = useMemo(() => <EventsItems events={events} />, [events])

	const onLoad = useCallback((events: FullEvent[]) => {
		setEvents(events)
	}, [])
	return (
		<>
			<Dashboard name="Events" className={props.className} onEventsLoad={onLoad}>
				{items}
			</Dashboard>
		</>
	)
}
