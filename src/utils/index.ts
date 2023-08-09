import { Languages } from '@/hooks/Language/types/Language.modal'

export function isClient() {
	return typeof window !== 'undefined'
}
export function getRandomKey(digitsCount: number = 6, exceptions: string[] = []): string {
	let str = ''
	do {
		const digits = []
		for (let i = 0; i < Math.max(digitsCount, 1); i++) {
			const randomKey = Math.round(Math.random() * 9)
			digits.push(randomKey)
		}
		str = digits.reduce((acc, val) => (acc += val), '')
	} while (exceptions.find((exception) => exception === str))

	return str
}

export function className(...classNames: (string | undefined)[]): string {
	const classes: string[] = classNames.filter((c): c is string => !!c)
	const style = classes
		.reduce((acc, val) => {
			if (!val) return acc
			return (acc += `${val} `)
		}, '')
		.trim()
	return style
}
export function createDatasetObject(data: { [key: string]: number | string | boolean | object }): object {
	return Object.keys(data).reduce((acc, val) => {
		if (data) {
			const name = `data-${val}`
			return { ...acc, [name]: `${data[val]}` }
		}
		return acc
	}, {})
}

export function setLocalStorage(data: Partial<LocalAppSettings>, overwrite = false) {
	if (!isClient()) return
	const newData = overwrite ? data : { ...getLocalStorage(), ...data }
	localStorage.setItem('FUELY_APP', JSON.stringify(newData))
}
export function getLocalStorage(): LocalAppSettings | null {
	if (!isClient()) return null
	const data = localStorage.getItem('FUELY_APP')

	if (!data) {
		return null
	}

	return JSON.parse(data)
}
export function setSessionStorage(data: Partial<SessionAppSettings>, overwrite = false) {
	if (!isClient()) return
	const newData = overwrite ? data : { ...getSessionStorage(), ...data }
	sessionStorage.setItem('FUELY_APP', JSON.stringify(newData))
}
export function getSessionStorage(): SessionAppSettings | null {
	if (!isClient()) return null
	const data = sessionStorage.getItem('FUELY_APP')

	if (!data) {
		return null
	}

	return JSON.parse(data)
}

export interface LocalAppSettings {
	theme: 'light' | 'dark'
	language: Languages
}
export interface SessionAppSettings {
	formData: any
	filters: {
		[key: string]: string
	}
}

export const emailRegEx = /[^\.@]*@[^\.@]*\.[^\.@]{2,3}/
export const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export function checkEmailAndPassword(email: string, password: string): { ok: boolean; message: string } {
	const status = {
		ok: true,
		message: ''
	}
	if (!email || !password) {
		status.ok = false
		status.message = 'empty-inputs'
	}
	if (!email.match(emailRegEx)) {
		status.ok = false
		status.message = 'invalid-email'
	}
	if (!password.match(passwordRegEx)) {
		status.ok = false
		status.message = 'invalid-password'
	}

	return status
}

export function checkIfStringIsNumber(value: string): boolean {
	return !!value.match(/(?<!.)[\d\.]*(?!.)/)
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString()
}

export function sortDate(a: string, b: string) {
	const dateA = a.split(':')[0]
	const dateB = b.split(':')[0]
	const dateIndexA = a.split(':')[1]
	const dateIndexB = b.split(':')[1]

	return new Date(dateA) > new Date(dateB) ? (dateIndexA > dateIndexB ? 1 : -1) : dateIndexA > dateIndexB ? -1 : 1
}

interface ObjectData {
	[key: string]: any
}
export function getProp<Key extends keyof ObjectData>(obj: ObjectData, key: Key): ObjectData[Key] {
	return obj[key]
}

export function round(number: number, round: number): number {
	const rounding = Math.max(Math.round(round), 1)
	return Math.floor(number * Math.pow(10, rounding)) / Math.pow(10, rounding)
}
