import React, { useEffect, useMemo, useState } from 'react'

import { FullEvent } from '@/hooks/Events.modal'
import useEvents from '@/hooks/use-events'
import useUnit from '@/hooks/use-unit'
import { className, getRandomKey } from '@/utils'

import Section from '@/components/Layout/Section'
import Graph from '@/components/UI/Graph'

import styles from '@styles/pages/Dashboard/Overview.module.scss'
import defaultStyles from '@styles/styles.module.scss'

interface Props {
	className?: string
}
interface Item {
	label: string
	currentValue: number
	previousValue: number
	unit: string | JSX.Element
	digits?: number
}

export default function Overview(props: Props) {
	const { events, getEvent, isLoading, emptyEvent } = useEvents()
	const { isMetric, units } = useUnit()

	const [event0, setEvent0] = useState<FullEvent>(emptyEvent)
	const [event1, setEvent1] = useState<FullEvent>(emptyEvent)

	// Styling
	const sectionStyles = className(defaultStyles.section, props.className)

	useEffect(() => {
		getEvent(0)
			.then((event) => {
				setEvent0(() => event)
			})
			.catch(() => {})
		getEvent(1)
			.then((event) => {
				setEvent1(() => event)
			})
			.catch(() => {})
	}, [isLoading, events, getEvent])

	const items: Item[] = useMemo(() => {
		// Last consumption
		const currentConsumption = (isMetric ? (event0.fuel / event0.distance) * 100 : event0.distance / event0.fuel) ?? 0
		// Second to last consumption
		const previousConsumption = (isMetric ? (event1.fuel / event1.distance) * 100 : event1.distance / event1.fuel) ?? 0

		return [
			{ label: 'Prize', currentValue: event0.cost, previousValue: event1.cost, unit: event0.currency.toUpperCase() },
			{ label: 'Fuel', currentValue: event0.fuel, previousValue: event1.fuel, unit: units.fuel },
			{
				label: 'Distance',
				currentValue: event0.distance,
				previousValue: event1.distance,
				unit: units.distance,
				digits: 0
			},
			{
				label: 'Consumption',
				currentValue: isFinite(currentConsumption) ? currentConsumption : 0,
				previousValue: isFinite(previousConsumption) ? previousConsumption : 0,
				unit: isMetric ? (
					<>
						<sup>{units.fuel}</sup>/<sub>100{units.distance}</sub>
					</>
				) : (
					<>
						<sup>{units.distance}</sup>/<sub>{units.fuel}</sub>
					</>
				)
			}
		]
	}, [
		event0.cost,
		event0.currency,
		event0.distance,
		event0.fuel,
		event1.cost,
		event1.distance,
		event1.fuel,
		isMetric,
		units.distance,
		units.fuel
	])

	const itemElements = items.map((item, i) => {
		const key = `${i}-${getRandomKey()}`

		const currentValue = item.currentValue > 0 ? item.currentValue : 0
		const previousValue = item.previousValue > 0 ? item.previousValue : 0

		const value = currentValue.toFixed(item.digits ?? 2)
		const prevValue = previousValue.toFixed(item.digits ?? 2)

		const max = Math.max(currentValue, previousValue, 1)

		const percent = currentValue / previousValue - 1

		// Adds + or - based on percent
		const percentString = isFinite(percent) ? `${percent >= 0 ? '+' : '-'}${Math.abs(percent * 100).toFixed(1)}` : '0'

		return (
			<React.Fragment key={key}>
				<label className={styles.label}>{item.label}</label>
				<Graph
					className={styles.graph}
					max={max}
					items={[
						{ name: value, value: currentValue || max },
						{ name: prevValue, value: previousValue || max }
					]}
				/>

				<data value={value}>
					<span className={styles.data}>
						{value}
						<span>{item.unit}</span>
					</span>
					<span className={styles.percent}>{percentString}</span>
				</data>
			</React.Fragment>
		)
	})
	return (
		<Section title="Overview" className={sectionStyles} contentClassName={styles.section}>
			<header>
				<h3>Last refuel</h3>
				<time dateTime={event0?.date}>{event0?.date}</time>
			</header>
			<hr />
			<div className={styles.main}>{itemElements}</div>
		</Section>
	)
}
