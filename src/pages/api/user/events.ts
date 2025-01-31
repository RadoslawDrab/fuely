import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase/auth'

import { currencies } from '@/utils/currency.ts'
import { returnError } from '../data'
import { getEvents, getUserData, removeValue, updateValue } from '../data/database'

import { Event } from '@/hooks/Events/types/Events.modal.ts'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { currentUser } = auth
		if (!currentUser) {
			return returnError(res, 'auth/not-logged-in')
		}
		switch (req.method) {
			case 'GET': {
				const events = await getEvents(currentUser)
				res.status(200).json(events)
				break
			}
			case 'PATCH': {
				const eventIds = getEventIds()
				const userObject = await getUserData(currentUser)

				const event: Partial<Event> = JSON.parse(req.body)

				if (!((typeof event.cost === 'number' && event.cost > 0) ||
					(typeof event.fuel === 'number' && event.fuel > 0) ||
					(typeof event.odometer === 'number' && event.odometer > 0) ||
					(typeof event.currency === 'string' && currencies.includes(event.currency)) ||
					((typeof event.vehicleId === 'string' && userObject.settings.vehicles.some((v) => v.id === event.vehicleId)) || event.vehicleId === null)
				)) return returnError(res, 'events/invalid-object')

				const events = await getEvents(currentUser)

				try {

				for (const id of eventIds) {
					if (!Object.keys(events).includes(id)) return returnError(res, 'events/invalid-id')

					await updateValue(event, 'events', id)
				}

				res.status(200).json({
					code: 'events/event-edited'
				})
				} catch (error: any) {
					return returnError(res, error.code)
				}
				break
			}
			case 'DELETE': {
				const eventId = req.query.eventId ?? null

				if (!eventId) {
					return returnError(res, 'eventId is missing')
				}
				const eventIds = getEventIds()
				for (const eventId of eventIds) {
					await removeValue('events', eventId)
				}
				res.status(200).json({
					code: 'events/event-removed'
				})

				break
			}
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}

	function getEventIds() {
		const eventId = req.query.eventId ?? null

		if (!eventId) {
			returnError(res, 'eventId is missing')
			return []
		}
		return Array.isArray(eventId) ? eventId : [eventId]
	}
}