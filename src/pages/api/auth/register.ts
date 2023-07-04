import { NextApiRequest, NextApiResponse } from 'next'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'

import { returnError, defaultUserSettings, parseBody } from '../data'
import { setValue } from '../data/database'

import { Status } from '../data/types/index.modal'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case 'POST': {
				const { email, password, name } = parseBody(req)

				const credential = await createUserWithEmailAndPassword(auth, email, password)

				await updateProfile(credential.user, {
					displayName: name || 'User'
				})
				await sendEmailVerification(credential.user)

				setValue(defaultUserSettings, 'users')
				setValue('', 'events')

				const status: Status = {
					code: 'auth/created'
				}
				res.status(200).json(status)
			}
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}

	return
}
