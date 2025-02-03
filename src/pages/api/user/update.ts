import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { parseBody, returnError } from '../data'
import { updateValue } from '../data/database'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { currentUser } = getAuth()
	// Returns error if user is not logged in
	if (!currentUser) {
		return returnError(res, 'auth/not-logged-in')
	}

	switch (req.method) {
		case 'PATCH': {
			try {
				const { displayName, units, currency, email, password } = parseBody(req)

				// Updates profile's display name
				if (displayName) {
					await updateProfile(currentUser, {
						displayName: displayName
					})
				}
				// Updates user's units type
				if (units) {
					await updateValue({ units }, 'users')
				}
				// Updates user's currency preference
				if (currency) {
					await updateValue({ currency }, 'users')
				}
				if (email) {
					await updateEmail(currentUser, password)
				}
				if (password) {
					await updatePassword(currentUser, password)
				}
				res.status(200).json({ code: 'user/updated' })
			} catch (error: any) {
				return returnError(res, error.code)
			}
		}
	}
}
