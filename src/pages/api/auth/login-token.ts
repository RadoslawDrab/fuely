import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase/auth'

import { returnError } from '../data'
import { getUserData } from '../data/database'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { currentUser } = auth

		if (currentUser) {
			const userObject = await getUserData(currentUser)
			res.status(200).json(userObject)
		} else {
			returnError(res, 'auth/no-data')
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}
}
