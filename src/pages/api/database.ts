import { child, get, set } from 'firebase/database'
import databaseRef from './_firebase.ts'
import { User, getAuth } from 'firebase/auth'
import { UserObject } from './auth/index.ts'

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
export function getUserData(user: User): Promise<UserObject> {
	return new Promise(async (resolve) => {
		const userData: UserObject = {
			displayName: user.displayName || 'User',
			email: user.email,
			settings: {
				units: 'metric',
				currency: 'usd'
			}
		}
		const snapshot = await get(child(databaseRef, `users/${user.uid}`))

		if (snapshot.exists()) {
			const value = snapshot.val()

			userData.settings = value
		}
		resolve(userData)
	})
}
