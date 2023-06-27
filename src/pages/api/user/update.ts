import { getAuth, updateProfile } from 'firebase/auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { returnError } from '../auth'
import { updateValue } from '../database'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'PATCH': {
			try {
				const { currentUser } = auth
				// Returns error if user is not logged in
				if (!currentUser) {
					return returnError(res, 'auth/no-user')
				}
				const { displayName, units, currency } = JSON.parse(req.body)

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
				res.status(200).json({ code: 'user/updated' })
			} catch (error: any) {
				return returnError(res, error)
			}
		}
	}
}
