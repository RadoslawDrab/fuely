import { child, get, remove, set, update } from 'firebase/database'
import { User, getAuth } from 'firebase/auth'

import databaseRef from './_firebase.ts'

import { Events } from '@/hooks/Events/types/Events.modal.ts'
import { UserObject } from './types/index.modal.ts'
import { Base } from './types/database.modal.ts'

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
export function setValue(value: any, base: Base, path: string = ''): Promise<void> {
	return new Promise((resolve, reject) => {
		const { currentUser } = auth
		if (!currentUser) {
			reject()
			return
		}
		set(child(databaseRef, `${base}/${currentUser.uid}${path ? '/' + path : ''}`), value)
			.then(() => {
				resolve()
			})
			.catch((error) => {
				reject(error.code)
			})
	})
}
export function updateValue(value: any, base: Base, path: string = ''): Promise<void> {
	return new Promise((resolve, reject) => {
		const { currentUser } = auth
		if (!currentUser) {
			reject()
			return
		}
		update(child(databaseRef, `${base}/${currentUser.uid}${path ? '/' + path : ''}`), value)
			.then(() => {
				resolve()
			})
			.catch((error) => {
				reject(error.code)
			})
	})
}
export function removeValue(base: Base, path: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const { currentUser } = auth
		if (!currentUser) {
			reject()
			return
		}
		remove(child(databaseRef, `${base}/${currentUser.uid}${path ? '/' + path : ''}`))
			.then(() => {
				resolve()
			})
			.catch((error) => {
				reject(error.code)
			})
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
