import { NextApiResponse, NextApiRequest } from 'next'

import { getEvents } from '../auth/database'
import { returnError } from '../auth'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST': {
			const { id } = JSON.parse(req.body)

			if (!id) {
				return
			}
			getEvents(id)
				.then((events) => {
					res.status(200).json(events)
				})
				.catch((error) => {
					returnError(res, 404, 'Not Found', error)
				})
		}
	}
}
