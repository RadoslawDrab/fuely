import { NextApiRequest, NextApiResponse } from 'next'

import { UserSettings } from './types/index.modal'

export const defaultUserSettings: UserSettings = {
	units: 'metric',
	currency: 'usd',
	vehicles: []
}

export function returnError(res: NextApiResponse, code: string, message?: string) {
	return res.status(400).json({ code, message })
}

export function parseBody(request: NextApiRequest): any {
	return JSON.parse(request.body) || {}
}
