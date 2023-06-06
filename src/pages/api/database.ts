import { child, get, set } from 'firebase/database'
import { User, getAuth } from 'firebase/auth'

import databaseRef from './_firebase.ts'
import { UserObject } from './auth/index.ts'
import { Events } from '@/hooks/Events.modal.ts'

const auth = getAuth()

export function getEvents(user: User): Promise<Events> {
	return new Promise(async (resolve) => {
		let data = {}
		const snapshot = await get(child(databaseRef, `events/${user.uid}`))

		if (snapshot.exists()) {
			data = snapshot.val()
		}
		resolve(data)
	})
}
export function setValue(value: any, base: 'events' | 'users', path: string = ''): Promise<void> {
	return new Promise((resolve, reject) => {
		const { currentUser } = auth
		if (!currentUser) {
			reject()
			return
		}
		set(child(databaseRef, `${base}/${currentUser.uid}${path ? '/' + path : ''}`), value)
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