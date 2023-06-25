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
]

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
