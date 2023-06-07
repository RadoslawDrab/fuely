import { useCallback, useEffect, useMemo, useState } from 'react'

import { currencyConvert, formatDate, sortDate } from '@/utils'
import { EventObject, FullEvent } from './Events.modal'
import useAppContext from './use-app-context'
import useUnit, { UnitType } from './use-unit'

const emptyEvent: FullEvent = {
	date: '',
	cost: -1,
	distance: -1,
	fuel: -1,
	odometer: -1,
	currency: 'usd'
}

export default function useEvents(): EventObject {
	const {
		user: { events, settings }
	} = useAppContext().Auth
	const { conversion, isMetric } = useUnit()

	const [isLoading, setIsLoading] = useState(false)

	// Dates sorted descending
	const sortedDates = useMemo(() => Object.keys(events).sort(sortDate), [events])

	// Sets loading based on events state
	useEffect(() => {
		setIsLoading(() => events === undefined)
	}, [events])

	const convert = useCallback(
		function (value: number, type: UnitType): number {
			return value * conversion[type]
		},
		[conversion]
	)

	const convertIfImperial = useCallback(
		function (value: number, type: UnitType): number {
			return isMetric ? value : convert(value, type)
		},
		[isMetric, convert]
	)
	const getEvent = useCallback(
		function (index: number): Promise<FullEvent> {
			return new Promise(async (resolve: (event: FullEvent) => void, reject: (errorMessage: string) => void) => {
				if (sortedDates.length <= 0) return reject('No events')

				// Gets date based on index
				const date = sortedDates[Math.max(Math.min(index, sortedDates.length - 1), 0)]
				const formattedDate = formatDate(date.split(':')[0])

				if (!date) {
					reject('No date for this index')
				}

				const e = events[date]

				// Converts units based on user preference
				const convertedEvent = {
					...e,
					distance: convertIfImperial(e.distance, 'distance'),
					fuel: convertIfImperial(e.fuel, 'fuel'),
					odometer: convertIfImperial(e.odometer, 'distance')
				}

				// Updates cost of an event based on user's currency preference
				const newCurrency = settings?.currency || 'usd'
				const newCost = await currencyConvert(convertedEvent.cost, convertedEvent.currency, newCurrency)
				const event = { ...convertedEvent, cost: newCost, currency: newCurrency }

				// Returns object with date and event data
				resolve({ date: formattedDate, ...event })
			})
		},
		[convertIfImperial, events, settings?.currency, sortedDates]
	)

	return {
		events,
		sortedDates,
		isLoading,
		emptyEvent,
		getEvent,
		formatDate,
		convert,
		convertIfImperial
	}
}
