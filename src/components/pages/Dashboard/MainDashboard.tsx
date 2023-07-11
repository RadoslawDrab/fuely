import React, { useCallback, useMemo, useState } from 'react'

import Dashboard from '@/components/Layout/Dashboard'
import MainDashboardItem from '@/components/pages/Dashboard/MainDashboardItems'

import { MainDashboardProps as Props } from './types/MainDashboard.modal'
import { FullEvent } from '@/hooks/Events/types/Events.modal'

export default function MainDashboard(props: Props) {
	const [events, setEvents] = useState<FullEvent[]>([])

	const items: any = useMemo(() => <MainDashboardItem events={events} />, [events])

	const onLoad = useCallback((events: FullEvent[]) => {
		setEvents(events)
	}, [])
	return (
		<>
			<Dashboard className={props.className} onEventsLoad={onLoad}>
				{items}
			</Dashboard>
		</>
	)
}
