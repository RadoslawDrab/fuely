import { NextApiRequest, NextApiResponse } from 'next'

import { UserObject, decryptToken, returnError } from '.'
import { getUsers } from './database'

interface UserData {
	id: string
	expires: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const response: any = await getUsers()
		const users: UserObject = response

		switch (req.method) {
			case 'POST': {
				const { token } = JSON.parse(req.body)
				// Checks if token exists or login and password exists
				if (!token) {
					return returnError(res, 400, 'Bad Request', 'Invalid input data')
				}

				const decrypted = decryptToken<UserData>(token)

				if (decrypted.status.code !== 200 || !decrypted.data) {
					return returnError(res, decrypted.status.code, decrypted.status.info, decrypted.status.message)
				}
				const { data } = decrypted

				const expirationDate = new Date(data.expires)

				const hasExpired = expirationDate < new Date()

				if (hasExpired) {
					return returnError(res, 401, 'Unauthorized', 'Token Expired')
				}

				// Returns user with the same id, login and password as user decrypted from token
				const userId = Object.keys(users).find((key) => key === data.id)

				if (!userId) {
					return returnError(res, 404, 'Not Found', 'User not found')
				}
				const user = { userId, user: users[userId].settings }

				res.status(200).json(user)
			}
		}
	} catch (error) {
		res.status(500).send(error)
	}
}
