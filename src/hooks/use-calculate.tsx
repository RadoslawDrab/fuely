import { getProp } from '@/utils'
import { FullEvent } from './Events.modal'
import useEvents from './use-events'
import useUnit from './use-unit'
import useAppContext from './use-app-context'

export interface Data {
	name: string
	unitType: string
	value: number
	decimals?: number
}
export default function useCalculate(event: FullEvent) {
	const { emptyEvent } = useEvents()
	const { units, isMetric } = useUnit()
	const { getText } = useAppContext().Language

	const keys = Object.keys(getData(emptyEvent))

	function getData(event: FullEvent) {
		const eventDistance = isMetric ? event.distance / 100 : event.distance
		const eventDistanceUnit = isMetric ? '100' + units.distance : units.distance
		const eventCurrencyUnit = event.currency.toUpperCase()

		const cost: Data = { name: getText('Cost'), unitType: eventCurrencyUnit, value: event.cost }
		const fuelAmount: Data = { name: getText('Fuel'), unitType: units.fuel, value: event.fuel }
		const distance: Data = {
			name: getText('Distance'),
			unitType: units.distance,
			value: checkDistance(event.distance),
			decimals: 0
		}
		const fuelPerCost: Data = {
			name: getText('Fuel/Cost'),
			unitType: `${units.fuel}/${eventCurrencyUnit}`,
			value: event.fuel / event.cost,
			decimals: 3
		}
		const costPerFuel: Data = {
			name: getText('Cost/Fuel'),
			unitType: `${eventCurrencyUnit}/${units.fuel}`,
			value: 1 / fuelPerCost.value
		}
		const fuelPerDistance: Data = {
			name: getText('Fuel/Distance'),
			unitType: `${units.fuel}/${eventDistanceUnit}`,
			value: checkDistance(event.fuel / eventDistance)
		}
		const distancePerFuel: Data = {
			name: getText('Distance/Fuel'),
			unitType: `${units.distance}/${units.fuel}`,
			value: checkDistance(event.distance / event.fuel)
		}
		const costPerDistance: Data = {
			name: getText('Cost/Distance'),
			unitType: `${eventCurrencyUnit}/${units.distance}`,
			value: checkDistance(event.cost / event.distance),
			decimals: 3
		}
		const distancePerCost: Data = {
			name: getText('Distance/Cost'),
			unitType: `${units.distance}/${eventCurrencyUnit}`,
			value: checkDistance(1 / costPerDistance.value)
		}
		function checkDistance(value: number) {
			return event.distance > 0 ? value : 0
		}

		return {
			cost,
			fuelAmount,
			distance,
			fuelPerCost,
			costPerFuel,
			fuelPerDistance,
			distancePerFuel,
			costPerDistance,
			distancePerCost
		}
	}
	function compare(compareEvent: FullEvent): { [key: string]: number } {
		const eventData = getData(event)
		const compareEventData = getData(compareEvent)

		return Object.keys(eventData).reduce((obj, type) => {
			const data = getProp(eventData, type).value
			const compareData = getProp(compareEventData, type).value

			const percent = (compareData / data) * 100 - 100
			return { ...obj, [type]: isNaN(percent) ? 0 : percent }
		}, {})
	}
	return {
		keys,
		compare,
		getData
	}
}
