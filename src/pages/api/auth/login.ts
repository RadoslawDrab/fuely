import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { parseBody, returnError } from '../data'
import { getUserData } from '../data/database'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case 'POST': {
				const { email, password } = parseBody(req)

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
