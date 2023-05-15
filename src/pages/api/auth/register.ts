import { NextApiRequest, NextApiResponse } from 'next'

import { getUsers, addUser } from './database'
import { getRandomKey } from '@/utils'
import { User, UserObject, decryptData, encryptData, returnError } from '.'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const response: any = await getUsers()
		const users: UserObject = response

		switch (req.method) {
			case 'POST': {
				const { login, password, userName } = JSON.parse(req.body)

				if (!login || !password) {
					return returnError(res, 400, 'Bad Request', "Login or password weren't set")
				}

				// User with the same login and password. User already exists
				const foundUser = Object.keys(users).find((key) => {
					const user = users[key]

					const decryptedLogin = decryptData(user.login)
					const decryptedPassword = decryptData(user.password)

					if (!decryptedLogin.data || !decryptedPassword.data) return false

					return decryptedLogin.data === login && decryptedPassword.data === password
				})

				if (foundUser) {
					return returnError(res, 400, 'Bad Request', 'User already exists')
				}

				const allIds = Object.keys(users)

				const user: User = {
					login: encryptData(login),
					password: encryptData(password),
					settings: {
						distanceUnit: 'kilometer',
						fuelUnit: 'liter',
						language: 'en',
						theme: 'light',
						name: userName || 'User'
					}
				}

				const randomId = getRandomKey(10, allIds)
				addUser(randomId, user)

				res.status(200).json({ code: 200, info: 'OK', message: 'User added' })
			}
		}
	} catch (error) {
		res.status(500).send(error)
	}
}
