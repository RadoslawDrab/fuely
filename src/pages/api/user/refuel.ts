import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase/auth'

import { Status, returnError } from '../auth'
import { Event } from '@/hooks/Events.modal'
import { getEvents, getUserData, setValue } from '../database'
import { sortDate } from '@/utils'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case 'POST': {
				const { date, cost, currency, odometer, fuel } = JSON.parse(req.body)

				if (!cost || !odometer || !fuel) {
					return returnError(res, 'event/not-enough-data')
				}
				const { currentUser } = auth

				if (!currentUser) {
					return returnError(res, 'auth/no-user')
				}

				const userObject = await getUserData(currentUser)
				const events = await getEvents(currentUser)

				const eventDatesSorted = Object.keys(events).reverse()
				const lastEvent = events[eventDatesSorted[0] || ''] || {}

				const distance = Math.max(odometer - (lastEvent.odometer || odometer), 0)
				const event: Event = {
					cost,
					odometer,
					fuel,
					currency: currency || userObject.settings.currency,
					distance
				}
				const curDate = date && new Date(date) ? new Date(date) : new Date()
				const dateString = `${curDate.getFullYear()}-${(curDate.getMonth() + 1).toString().padStart(2, '0')}-${curDate
					.getDate()
					.toString()
					.padStart(2, '0')}`

				let id = 0
				eventDatesSorted.forEach((event) => {
					const eventDate = event.split(':')[0]
					if (eventDate === dateString) id++
				})

				const eventDate = `${dateString}:${id}`

				setValue(event, 'events', eventDate)
					.then(() => {
						const status: Status = { code: 'event/event-added' }
						res.status(200).json(status)
					})
					.catch((error) => {
						const status: Status = { code: error }
						res.status(401).json(status)
					})

				break
			}
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}
}
