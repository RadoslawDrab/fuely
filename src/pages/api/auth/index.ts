import { NextApiResponse } from 'next'
import CryptoJS from 'crypto-js'

import { Languages } from '@/hooks/Language.modal'

const tokenKey = '#Fuely-Token#'
const dataKey = '#Fuely-Data#'

export interface User {
	login: string
	password: string
	settings: UserSettings
}
export interface UserObject {
	[id: string]: User
}
export interface UserSettings {
	language: Languages
	theme: 'light' | 'dark'
	distanceUnit: 'kilometer' | 'mile'
	fuelUnit: 'liter' | 'galon'
}

export interface Status {
	code: number
	info: string
	message?: string
}
interface ReturnObject<Type> {
	status: Status
	data?: Type
}

type EncryptionKey = 'token' | 'data'

export function createToken<T>(data: T, expirationTime: number): string {
	// Create expiration date based on `expirationTime`
	const expirationDate = new Date().setMinutes(new Date().getMinutes() + expirationTime)

	// Creates data object
	const newData = {
		...data,
		expires: new Date(expirationDate).toISOString()
	}

	const encrypted = encrypt(newData, 'token')
	return encrypted
}
export function decryptToken<T>(token: string): ReturnObject<T> {
	const decrypted = decrypt<T>(token, 'token')
	return decrypted
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
		return { status: { info: 'Bad Request', code: 400, message: 'Invalid token' } }
	}
	// Returns status and data object
	return { status: { info: 'Success', code: 200 }, data: JSON.parse(tokenDecrypted) }
}

export function returnError(res: NextApiResponse, code: number, info: string, message?: string) {
	return res.status(code).send({ code, info, message })
}
