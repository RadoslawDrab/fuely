export const currencies = [
	'pln',
	'usd',
	'aud',
	'bgn',
	'byn',
	'byr',
	'cad',
	'chf',
	'cop',
	'cny',
	'cuc',
	'czk',
	'dkk',
	'egp',
	'eur',
	'gbp',
	'hrk',
	'inr',
	'jpy',
	'ltl',
	'lvl',
	'mkd',
	'mxn',
	'nok',
	'nzd',
	'ron',
	'rub',
	'syp',
	'uah',
	'uyu'
] as const

export function getCurrencies(): Promise<{ [key: string]: string }> {
	return new Promise(async (resolve) => {
		const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json`)

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
			`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${valueCurrency}.min.json`
		)

		const data = await response.json()
		resolve(data[valueCurrency][endpointCurrency] * value)
	})
}

export type Currencies = (typeof currencies)[number]
