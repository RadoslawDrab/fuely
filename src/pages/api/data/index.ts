import { NextApiRequest, NextApiResponse } from 'next'

import { decrypt } from './_local'

import { UserSettings } from './types/index.modal'

export const defaultUserSettings: UserSettings = {
	units: 'metric',
	currency: 'usd'
}

export function returnError(res: NextApiResponse, code: string, message?: string) {
	return res.status(400).json({ code, message })
}

export function parseBody(request: NextApiRequest): any {
	return decrypt<string>(request.body).data || {}
}
