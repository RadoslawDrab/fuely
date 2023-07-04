import { useCallback, useEffect, useMemo, useState } from 'react'

import { currencyConvert } from '@/utils/currency'
import { formatDate } from '@/utils'
import useAppContext from '../Other/use-app-context'
import useUnit from '../Other/use-unit'

import { EventObject, FullEvent } from './types/Events.modal'

const emptyEvent: FullEvent = {
	id: -1,
	date: '',
	fullId: '',
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
	const { convertIfImperial } = useUnit()

	const [isLoading, setIsLoading] = useState(false)

	// Dates sorted descending
	const sortedDates = useMemo(() => Object.keys(events).reverse(), [events])

	// Sets loading based on events state
	useEffect(() => {
		setIsLoading(() => events === undefined)
	}, [events])

	const getEvent = useCallback(
		function (index: number): Promise<FullEvent> {
			return new Promise(async (resolve: (event: FullEvent) => void, reject: (errorMessage: string) => void) => {
				if (sortedDates.length <= 0) return reject('No events')

				// Gets date based on index
				const date = sortedDates[Math.max(Math.min(index, sortedDates.length - 1), 0)]
				const formattedDate = formatDate(date.split(':')[0])
				const id = +date.split(':')[1]

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
				resolve({ id, fullId: date, date: formattedDate, ...event })
			})
		},
		[convertIfImperial, events, settings?.currency, sortedDates]
	)
	const getEventById = useCallback(
		function (eventId: string): Promise<FullEvent> {
			return new Promise(async (resolve: (event: FullEvent) => void, reject: (errorMessage: string) => void) => {
				if (sortedDates.length <= 0) return reject('No events')

				// Gets date based on `eventId`
				const date = sortedDates.find((date) => date === eventId)
				if (!date) {
					return reject(`No event with ${eventId} id`)
				}
				const formattedDate = formatDate(date.split(':')[0])
				const id = +date.split(':')[1]

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
				resolve({ id, fullId: date, date: formattedDate, ...event })
			})
		},
		[convertIfImperial, events, settings?.currency, sortedDates]
	)

	const removeEvent = useCallback(function (eventId: string) {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await fetch('/api/user/events', {
					method: 'PATCH',
					body: JSON.stringify(eventId)
				})

				let func = resolve
				if (!response.ok) {
					func = reject
				}
				const value = await response.json()
				func(value)
			} catch (error) {
				console.log(error)
			}
		})
	}, [])
	return {
		events,
		sortedDates,
		isLoading,
		emptyEvent,
		getEvent,
		getEventById,
		formatDate,
		removeEvent
	}
}
