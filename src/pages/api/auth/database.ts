import { NextApiRequest, NextApiResponse } from 'next'

import { child, get, set } from 'firebase/database'
import databaseRef from './_firebase.ts'

import { User } from '.'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	getUsers()
		.then((data) => {
			res.status(200).json(data)
		})
		.catch((error: Error) => {
			res.status(500).send(error.message)
		})
}

export function getUsers() {
	return new Promise(async (resolve, reject) => {
		get(child(databaseRef, 'users/')).then((snapshot) => {
			if (snapshot.exists()) {
				resolve(snapshot.val())
			} else {
				reject()
			}
		})
	})
}

export function addUser(id: string, user: User) {
	set(child(databaseRef, `users/${id}`), {
		...user
	})
}
