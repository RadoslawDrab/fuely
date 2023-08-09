import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

import { parseBody, returnError } from '../data'
import { Status } from '../data/types/index.modal'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case 'POST': {
				const { email } = parseBody(req)

				await sendPasswordResetEmail(auth, email)

				const status: Status = { code: 'auth/password-reset-sent' }
				res.status(200).json(status)
			}
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}
}
