import useAppContext from './use-app-context'

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
				units.distance = 'm'
				units.fuel = 'G'
			}
		}
	}
	return {
		system: user.settings?.units ?? 'metric',
		isMetric: (user.settings?.units ?? 'metric') === 'metric',
	}
}
