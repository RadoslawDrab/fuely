import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase/auth'

import { returnError } from '../auth/'
import { getEvents, removeValue } from '../database'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { currentUser } = auth
		if (!currentUser) {
			return returnError(res, 'auth/no-user')
		}
		switch (req.method) {
			case 'GET': {
				const events = await getEvents(currentUser)
				res.status(200).json(events)
				break
			}
			case 'PATCH': {
				const eventId = req.body
				await removeValue('events', eventId)
				res.status(200).json({
					code: 'events/removed'
				})

				break
			}
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}
}
