import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { getUserData, returnError } from '../auth'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case 'POST': {
				const { login, password } = JSON.parse(req.body)

				const credential = await signInWithEmailAndPassword(auth, login, password)
				const user = credential.user

				const userObject = await getUserData(user)

				res.status(200).json(userObject)
			}
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}
}
