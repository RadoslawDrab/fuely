import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase/auth'

import databaseRef from '../auth/_firebase'
import { returnError } from '../auth/'
import { child, get } from 'firebase/database'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { currentUser } = auth

		if (currentUser) {
			const snapshot = await get(child(databaseRef, `events/${currentUser.uid}`))

			if (snapshot.exists()) {
				res.status(200).json(snapshot.val())
			} else {
				returnError(res, 'user/no-events')
			}
		} else {
			returnError(res, 'auth/no-user')
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}
}
