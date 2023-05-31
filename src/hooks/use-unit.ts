import useAppContext from './use-app-context'

export type UnitType = 'distance' | 'fuel'
export default function useUnit() {
	const { user } = useAppContext().Auth

	const conversion = {
		// kilometers > miles
		distance: 0.621371192,
		// liters > galons
		fuel: 0.264172052
	}
	const units = {
		distance: 'km',
		fuel: 'L',
		currency: user.settings?.currency ?? 'USD'
	}
	if (user) {
		const system = user.settings?.units
		switch (system) {
			case 'imperial': {
				units.distance = 'm'
				units.fuel = 'G'
			}
		}
	}
	return {
		system: user.settings?.units ?? 'metric',
		isMetric: (user.settings?.units ?? 'metric') === 'metric',
		units,
		conversion
	}
}
