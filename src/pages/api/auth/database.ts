import { child, get, set } from 'firebase/database'
import databaseRef from './_firebase.ts'

export function getEvents(id: string) {
	return new Promise((resolve: (value: object) => void, reject) => {
		get(child(databaseRef, `events/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					resolve(snapshot.val())
				} else {
					reject('Data not found')
				}
			})
			.catch((error) => reject(error))
	})
}
