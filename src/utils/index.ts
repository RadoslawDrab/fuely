import { Languages } from '@/hooks/Language.modal'

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

export function getCurrencies(): Promise<{ [key: string]: string }> {
	return new Promise(async (resolve) => {
		const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`)

		const data = await response.json()

		resolve(data)
	})
}
export function currencyConvert(value: number, valueCurrency: string, endpointCurrency: string): Promise<number> {
	return new Promise(async (resolve) => {
		if (valueCurrency === endpointCurrency) {
			resolve(value)
		}
		const response = await fetch(
			`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${valueCurrency}/${endpointCurrency}.json`
		)

		const data = await response.json()

		resolve(data[endpointCurrency] * value)
	})
}

export function setLocalStorage(data: Partial<AppSettings>, overwrite = false) {
	if (!isClient()) return
	const newData = overwrite ? data : { ...getLocalStorage(), ...data }
	localStorage.setItem('FUELY_APP', JSON.stringify(newData))
}
export function getLocalStorage(): AppSettings | null {
	if (!isClient()) return null
	const data = localStorage.getItem('FUELY_APP')

	if (!data) {
		return null
	}

	return JSON.parse(data)
}

export interface AppSettings {
	theme: 'light' | 'dark'
	language: Languages
}

export const emailRegEx = /[^\.@]*@[^\.@]*\.[^\.@]{2,3}/
export const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
export const passwordInfo =
	'Password must contain: minimum 8 characters, uppercase letter, lowercase letter, number and special character'

export function checkEmailAndPassword(email: string, password: string): { ok: boolean; message: string } {
	const status = {
		ok: true,
		message: ''
	}
	if (!email || !password) {
		status.ok = false
		status.message = 'Some inputs are empty'
	}
	if (!email.match(emailRegEx)) {
		status.ok = false
		status.message = 'Email is not valid'
	}
	if (!password.match(passwordRegEx)) {
		status.ok = false
		status.message = passwordInfo
	}

	return status
}
