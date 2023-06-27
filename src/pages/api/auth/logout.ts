import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, signOut } from 'firebase/auth'

import { returnError } from '.'

import { Status } from './index.modal'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { currentUser } = auth

		if (currentUser) {
			await signOut(auth)

			const status: Status = {
				code: 'auth/logout'
			}
			res.status(200).json(status)
		} else {
			returnError(res, 'auth/no-user')
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}
}
