import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase/auth'

import { parseBody, returnError } from '../data'
import { getEvents, removeValue } from '../data/database'

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
				const eventId = parseBody(req)
				await removeValue('events', eventId)
				res.status(200).json({
					code: 'events/event-removed'
				})

				break
			}
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}
}
