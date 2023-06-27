import { NextApiResponse } from 'next'
import CryptoJS from 'crypto-js'

import { EncryptionKey, ReturnObject, UserSettings } from './index.modal'

const tokenKey = '#Fuely-Token#'
const dataKey = '#Fuely-Data#'

export const defaultUserSettings: UserSettings = {
	units: 'metric',
	currency: 'usd'
}
export function encryptData<T>(data: T) {
	return encrypt<T>(data, 'data')
}
export function decryptData<T>(encryptionData: string) {
	return decrypt<T>(encryptionData, 'data')
}

function getKey(key: EncryptionKey) {
	switch (key) {
		case 'token':
			return tokenKey
		case 'data':
			return dataKey
	}
}

function encrypt<T>(data: T, key: EncryptionKey) {
	// Encrypts data and returns it
	return CryptoJS.AES.encrypt(JSON.stringify(data), getKey(key)).toString()
}
function decrypt<T>(encryptedData: string, key: EncryptionKey): ReturnObject<T> {
	// Decrypts data based on input
	const bytes = CryptoJS.AES.decrypt(encryptedData, getKey(key))
	const tokenDecrypted = bytes.toString(CryptoJS.enc.Utf8)

	// Checks if encryption was successful
	if (!tokenDecrypted) {
		return { status: { code: 'Bad Request', message: 'Invalid token' } }
	}
	// Returns status and data object
	return { status: { code: 'Success' }, data: JSON.parse(tokenDecrypted) }
}

export function returnError(res: NextApiResponse, code: string, message?: string) {
	return res.status(400).json({ code, message })
}
