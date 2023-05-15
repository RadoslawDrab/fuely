import { NextApiRequest, NextApiResponse } from 'next'

import { User, createToken, decryptData, decryptToken, encryptData, returnError } from '../auth'

interface UserData {
	id: string
	expires: string
}
const DUMMY_DATA: User[] = [
	{
		id: '123456',
		login: encryptData('Radek'),
		password: encryptData('Password'),
		settings: {
			language: 'pl',
			theme: 'dark',
			distanceUnit: 'kilometer',
			fuelUnit: 'liter'
		}
	},
	{
		id: '234567',
		login: encryptData('Dominik'),
		password: encryptData('Password'),
		settings: {
			language: 'pl',
			theme: 'dark',
			distanceUnit: 'kilometer',
			fuelUnit: 'liter'
		}
	}
]

const users: User[] = [...DUMMY_DATA]

// 4h
const expirationTime = 4 * 60

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST': {
			const { token, login, password } = JSON.parse(req.body)
			// Checks if token exists or login and password exists
			if (!token && (!login || !password)) {
				return returnError(res, 400, 'Bad Request', 'Invalid input data')
			}

			if (login && password) {
				// Decrypts user's login and passwords, checks every user for same login and password
				const user = users.find((user) => {
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

				if (!user) {
					return returnError(res, 404, 'Not Found', 'User not found')
				}

				const userData: UserData = { id: user.id, expires: '' }
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
			const user = users.find((user) => {
				return user.id === data.id
			})

			if (!user) {
				return returnError(res, 404, 'Not Found', 'User not found')
			}

			res.status(200).json(user)
		}
	}
}
