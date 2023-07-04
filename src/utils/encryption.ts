import CryptoJS from 'crypto-js'

import { DATA_ENCRYPTION_KEY } from '@main/_local'

import { Status } from '@/pages/api/data/types/index.modal'

interface ReturnObject<Type> {
	status: Status
	data?: Type
}

export function encrypt<Data>(data: Data) {
	// Encrypts data and returns it
	return CryptoJS.AES.encrypt(JSON.stringify(data), DATA_ENCRYPTION_KEY).toString()
}
export function decrypt<Data>(encryptedData: string): ReturnObject<Data> {
	// Decrypts data based on input
	const bytes = CryptoJS.AES.decrypt(encryptedData, DATA_ENCRYPTION_KEY)
	const tokenDecrypted = bytes.toString(CryptoJS.enc.Utf8)

	// Checks if encryption was successful
	if (!tokenDecrypted) {
		return { status: { code: 'Bad Request', message: 'Invalid token' } }
	}
	// Returns status and data object
	return { status: { code: 'Success' }, data: JSON.parse(tokenDecrypted) }
}
