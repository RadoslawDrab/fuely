import React, { useCallback, useMemo, useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import { EventsProps as Props } from './types/Events.modal'
import { FullEvent } from '@/hooks/Events/types/Events.modal'

import Dashboard from '@/components/Layout/Dashboard/Dashboard'
import EventsItems from '@/components/pages/Dashboard/EventsItems'

import styles from '@styles/pages/Dashboard/EventsItems.module.scss'

export default function Events(props: Props) {
	const [events, setEvents] = useState<FullEvent[]>([])

	const items: any = useMemo(() => <EventsItems events={events} />, [events])
	const { getText } = useAppContext().Language

	const onLoad = useCallback((events: FullEvent[]) => {
		setEvents(events)
	}, [])

	const content = (() => {
		if (events.length === 0)
			return (
				<li className={styles.item}>
					<span>{getText('No data')}</span>
				</li>
			)
		return items
	})()

	return (
		<>
			<Dashboard name={getText('Events')} className={props.className} onEventsLoad={onLoad}>
				{content}
			</Dashboard>
		</>
	)
}
