import { useCallback } from 'react'

import useAppContext from './use-app-context'

export type UnitType = 'distance' | 'fuel'

const conversion = {
	// kilometers > miles
	distance: 0.621371192,
	// liters > galons
	fuel: 0.264172052
}
export default function useUnit() {
	const { user } = useAppContext().Auth

	const units = {
		distance: 'km',
		fuel: 'L',
		currency: user.settings?.currency ?? 'USD'
	}
	if (user) {
		const system = user.settings?.units
		switch (system) {
			case 'imperial': {
				units.distance = 'mi'
				units.fuel = 'gal'
			}
		}
	}

	const isMetric = (user.settings?.units ?? 'metric') === 'metric'

	const convert = useCallback(function (value: number, type: UnitType, reverse: boolean = false): number {
		return value * (reverse ? 1 / conversion[type] : conversion[type])
	}, [])

	const convertIfImperial = useCallback(
		function (value: number, type: UnitType, reverse: boolean = false): number {
			return isMetric ? value : convert(value, type, reverse)
		},
		[isMetric, convert]
	)

	return {
		system: user.settings?.units ?? 'metric',
		isMetric,
		units,
		conversion,
		convert,
		convertIfImperial
	}
}
