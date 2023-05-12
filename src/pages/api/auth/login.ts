import { NextApiRequest, NextApiResponse } from 'next'

import { User, createToken, decryptData, decryptToken, encryptData, returnStatus } from '../auth'

interface UserData {
	id: string
	login: string
	password: string
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
				returnStatus(res, 400, 'Bad Request')
				return
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
					returnStatus(res, 404, 'Not Found')
					return
				}

				const userData: UserData = { id: user.id, login: user.login, password: user.password, expires: '' }
				const newToken = createToken(userData, expirationTime)

				res.status(200).json({ token: newToken })

				return
			}

			const decrypted = decryptToken<UserData>(token)

			if (decrypted.status.code !== 200) {
				returnStatus(res, decrypted.status.code, decrypted.status.message)
				return
			}
			const { data } = decrypted

			if (!data) {
				return
			}

			const expirationDate = new Date(data.expires)

			const hasExpired = expirationDate < new Date()

			if (hasExpired) {
				returnStatus(res, 403, 'Token Expired')
				return
			}

			// Returns user with the same id, login and password as user decrypted from token
			const user = users.find((user) => {
				return user.id === data.id && user.login === data.login && user.password === data.password
			})

			if (!user) {
				returnStatus(res, 404, 'Not Found')
				return
			}

			res.status(200).json(user)
		}
	}
}
