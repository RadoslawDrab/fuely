import { getProp } from '@/utils'
import { FullEvent } from './Events.modal'
import useEvents from './use-events'
import useUnit from './use-unit'

export interface Data {
	name: string
	unitType: string
	value: number
	decimals?: number
}
export default function useCalculate(event: FullEvent) {
	const { emptyEvent } = useEvents()
	const { units, isMetric } = useUnit()

	const keys = Object.keys(getData(emptyEvent))

	function getData(event: FullEvent) {
		const eventDistance = isMetric ? event.distance / 100 : event.distance
		const eventDistanceUnit = isMetric ? '100' + units.distance : units.distance
		const eventCurrencyUnit = event.currency.toUpperCase()

		const cost: Data = { name: 'Cost', unitType: eventCurrencyUnit, value: event.cost }
		const fuelAmount: Data = { name: 'Fuel Amount', unitType: units.fuel, value: event.fuel }
		const distance: Data = { name: 'Distance', unitType: units.distance, value: checkDistance(event.distance), decimals: 0 }
		const fuelPerCost: Data = {
			name: 'Fuel per Cost',
			unitType: `${units.fuel}/${eventCurrencyUnit}`,
			value: event.fuel / event.cost,
			decimals: 3
		}
		const costPerFuel: Data = {
			name: 'Cost per Fuel',
			unitType: `${eventCurrencyUnit}/${units.fuel}`,
			value: 1 / fuelPerCost.value
		}
		const fuelPerDistance: Data = {
			name: 'Fuel per Distance',
			unitType: `${units.fuel}/${eventDistanceUnit}`,
			value: checkDistance(event.fuel / eventDistance)
		}
		const distancePerFuel: Data = {
			name: 'Distance per Fuel',
			unitType: `${units.distance}/${units.fuel}`,
			value: checkDistance(1 / fuelPerDistance.value),
			decimals: 3
		}
		const costPerDistance: Data = {
			name: 'Cost per Distance',
			unitType: `${eventCurrencyUnit}/${units.distance}`,
			value: checkDistance(event.cost / event.distance),
			decimals: 3
		}
		const distancePerCost: Data = {
			name: 'Distance per Cost',
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
