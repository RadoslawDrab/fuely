import { NextApiRequest, NextApiResponse } from 'next'

import { UserObject, createToken, decryptData, decryptToken, returnError } from '../auth'
import { getUsers } from './database'

interface UserData {
	id: string
	expires: string
}

// 4h
const expirationTime = 4 * 60

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const response: any = await getUsers()
		const users: UserObject = response

		switch (req.method) {
			case 'POST': {
				const { token, login, password } = JSON.parse(req.body)
				// Checks if token exists or login and password exists
				if (!token && (!login || !password)) {
					return returnError(res, 400, 'Bad Request', 'Invalid input data')
				}

				if (login && password) {
					// Decrypts user's login and passwords, checks every user for same login and password
					const userId = Object.keys(users).find((key) => {
						const user = users[key]
						const decryptedLogin = decryptData<string>(user.login)
						const decryptedPassword = decryptData<string>(user.password)

						if (
							(decryptedLogin.status.code !== 200 || decryptedPassword.status.code !== 200) &&
							(!decryptedLogin.data || !decryptedPassword.data)
						) {
							return false
						}

						return decryptedLogin.data === login && decryptedPassword.data === password
					})

					if (!userId) {
						return returnError(res, 404, 'Not Found', 'User not found')
					}

					const userData: UserData = { id: userId, expires: '' }
					const newToken = createToken(userData, expirationTime)

					res.status(200).json({ token: newToken })

					return
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
				const user = users[userId]

				res.status(200).json(user)
			}
		}
	} catch (error) {
		res.status(500).send(error)
	}
}
