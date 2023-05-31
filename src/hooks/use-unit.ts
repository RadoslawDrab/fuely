import useAppContext from './use-app-context'

export default function useUnit() {
	const { user } = useAppContext().Auth

	const units = {
		distance: 'km',
		fuel: 'L',
		currency: user?.currency ?? 'USD'
	}
	if (user) {
		const system = user.units
		switch (system) {
			case 'imperial': {
				units.distance = 'm'
				units.fuel = 'g'
			}
		}
	}
	return {
		system: user?.units ?? 'metric',
		isMetric: (user?.units ?? 'metric') === 'metric',
		units
	}
}
