import { NextApiRequest, NextApiResponse } from 'next'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'

import { Status, returnError } from '.'

import databaseRef from '../_firebase'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case 'POST': {
				const { email, password, name } = JSON.parse(req.body)

				const credential = await createUserWithEmailAndPassword(auth, email, password)

				await updateProfile(credential.user, {
					displayName: name || 'User'
				})

				const status: Status = {
					ok: true,
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
