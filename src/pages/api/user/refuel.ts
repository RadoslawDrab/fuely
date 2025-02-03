import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase/auth'

import { parseBody, returnError } from '../data'
import { getEvents, getUserData, setValue } from '../data/database'

import { Status } from '../data/types/index.modal'
import { Event } from '@/hooks/Events/types/Events.modal'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { currentUser } = getAuth()
	if (!currentUser) {
		return returnError(res, 'auth/not-logged-in')
	}
	try {
		switch (req.method) {
			case 'POST': {
				const { date, cost, currency, odometer, fuel, vehicleId } = parseBody(req)

				if ((cost !== undefined && cost <= 0) || (odometer !== undefined && odometer < 0) || (fuel !== undefined && fuel <= 0) || !vehicleId) {
					return returnError(res, 'event/not-enough-data')
				}

				const userObject = await getUserData(currentUser)
				const events = await getEvents(currentUser)

				const eventDatesSorted = Object.keys(events).reverse()

				const event: Event = {
					cost,
					odometer,
					fuel,
					currency: currency || userObject.settings.currency,
					vehicleId
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
						returnError(res, error)
					})

				break
			}
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}
}
