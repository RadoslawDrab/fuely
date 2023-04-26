export function isClient() {
	return typeof window !== 'undefined'
}
export function getRandomKey(digitsCount: number = 6): string {
	const digits = []
	for (let i = 0; i < Math.max(digitsCount, 1); i++) {
		const randomKey = Math.round(Math.random() * 9)
		digits.push(randomKey)
	}
	const str = digits.reduce((acc, val) => (acc += val), '')
	return str
}
