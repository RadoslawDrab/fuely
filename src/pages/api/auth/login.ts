import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { parseBody, returnError } from '../data'
import { getUserData } from '../data/database'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case 'POST': {
				const { email, password } = parseBody(req)

				await signOut(auth)
				const credential = await signInWithEmailAndPassword(auth, email, password)
				const user = credential.user

				if (!user.emailVerified) {
					await sendEmailVerification(user)
					return returnError(res, 'auth/email-not-verified')
				}

				const userObject = await getUserData(user)

				res.status(200).json(userObject)
			}
		}
	} catch (error: any) {
		returnError(res, error.code, error.message)
	}
}
