import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { returnError } from '../auth'
import { getUserData } from '../database'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case 'POST': {
				const { email, password } = JSON.parse(req.body)

				const credential = await signInWithEmailAndPassword(auth, email, password)
				const user = credential.user

				const userObject = await getUserData(user)

				res.status(200).json(userObject)
			}
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}
}
