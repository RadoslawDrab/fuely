import { useEffect, useState } from 'react'

import useAppContext from './use-app-context'
import { EventObject, FullEvent } from './Events.modal'

const emptyEvent: FullEvent = {
	date: '',
	cost: 0,
	distance: 0,
	fuel: 0,
	odometer: 0
}
export default function useEvents(): EventObject {
	const {
		user: { events }
	} = useAppContext().Auth

	const [isLoading, setIsLoading] = useState(false)

	// Dates sorted descending
	const sortedDates = Object.keys(events).sort((a: string, b: string) => {
		return new Date(a) > new Date(b) ? -1 : 1
	})

	// Sets loading based on events state
	useEffect(() => {
		setIsLoading(() => events === undefined)
	}, [events])

	function getEvent(index: number) {
		if (sortedDates.length <= 0) return null

		// Gets date based on index
		const date = sortedDates[Math.max(Math.min(index, sortedDates.length - 1), 0)]
		const formattedDate = formatDate(date)

		if (!date) {
			return null
		}
		// Returns object with date and event data
		return { date: formattedDate, ...events[date] }
	}

	function formatDate(date: string) {
		const d = new Date(date)
		const formattedDate = `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1)
			.toString()
			.padStart(2, '0')}.${d.getFullYear()}`

		return formattedDate
	}

	return {
		events,
		sortedDates,
		isLoading,
		emptyEvent,
		getEvent,
		formatDate
	}
}
