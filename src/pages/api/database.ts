import { child, get, set } from 'firebase/database'
import databaseRef from './_firebase.ts'
import { getAuth } from 'firebase/auth'

const auth = getAuth()

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
export function setValue(value: any, path: 'events' | 'users'): Promise<void> {
	return new Promise((resolve, reject) => {
		const { currentUser } = auth
		if (!currentUser) {
			reject()
			return
		}
		set(child(databaseRef, `${path}/${currentUser.uid}`), value)
		resolve()
	})
}
