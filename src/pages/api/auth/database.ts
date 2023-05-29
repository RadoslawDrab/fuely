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
	return new Promise((resolve, reject) => {
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

export function getEvents(id: string) {
	return new Promise((resolve: (value: object) => void, reject) => {
		get(child(databaseRef, `events/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					resolve(snapshot.val())
				} else {
					reject()
				}
			})
			.catch((error) => reject(error))
	})
}
