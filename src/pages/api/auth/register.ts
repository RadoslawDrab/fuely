import { NextApiRequest, NextApiResponse } from 'next'

import { getRandomKey } from '@/utils'

import { User, decryptData, encryptData, returnStatus } from '.'

const users: User[] = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST': {
			const { login, password, theme, language } = JSON.parse(req.body)

			if (!login || !password) {
				returnStatus(res, 400, 'Bad Request', "Login or password wasn't set")
				return
			}

			// User with the same login and password. User already exists
			const foundUser = users.find((user) => {
				const decryptedLogin = decryptData(user.login)
				const decryptedPassword = decryptData(user.password)

				if (!decryptedLogin.data || !decryptedPassword.data) return false
				return decryptedLogin.data === login && decryptedPassword.data === password
			})

			if (foundUser) {
				returnStatus(res, 400, 'Bad Request', 'User already exists')
				return
			}

			const allIds = users.map((user) => user.id)

			const user: User = {
				id: getRandomKey(10, allIds),
				login: encryptData(login),
				password: encryptData(password),
				settings: {
					distanceUnit: 'kilometer',
					fuelUnit: 'liter',
					language: language,
					theme: theme
				}
			}
			users.push(user)
			res.status(200).json(users)
		}
	}
}
