import React from 'react'

import { className, getRandomKey } from '@/utils'
import useEvents from '@/hooks/use-events'
import useUnit from '@/hooks/use-unit'

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
	const { getEvent, isLoading } = useEvents()
	const { isMetric, units } = useUnit()

	if (isLoading) return <></>

	// Last event
	const event0 = getEvent(0)
	// Second to last event
	const event1 = getEvent(1)

	if (!event0 || !event1) return <></>

	// Styling
	const sectionStyles = className(defaultStyles.section, props.className)

	// Last consumption
	const currentConsumption = isMetric ? (event0.fuel / event0.distance) * 100 : event0.distance / event0.fuel
	// Second to last consumption
	const previousConsumption = isMetric ? (event1.fuel / event1.distance) * 100 : event1.distance / event1.fuel

	const items: Item[] = [
		{ label: 'Prize', currentValue: event0.cost, previousValue: event1.cost, unit: units.currency },
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
			currentValue: currentConsumption,
			previousValue: previousConsumption,
			unit: isMetric ? (
				<>
					<sup>{units.fuel}</sup>/<sub>100{units.distance}</sub>
				</>
			) : (
				<>
					<sup>{units.distance}</sup>/<sub>{units.fuel}</sub>
				</>
			),
			digits: 2
		}
	]
	const itemElements = items.map((item, i) => {
		const key = `${i}-${getRandomKey()}`

		const percent = item.currentValue / item.previousValue - 1
		// Adds + or - based on percent
		const percentString = `${percent > 0 ? '+' : '-'}${Math.abs(percent * 100).toFixed(1)}`

		const value = item.currentValue.toFixed(item.digits ?? 1)
		const prevValue = item.previousValue.toFixed(item.digits ?? 1)

		return (
			<React.Fragment key={key}>
				<label className={styles.label}>{item.label}</label>
				<Graph
					className={styles.graph}
					max={Math.max(item.currentValue, item.previousValue)}
					items={[
						{ name: value, value: item.currentValue },
						{ name: prevValue, value: item.previousValue }
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
				<time dateTime={event0.date}>{event0.date}</time>
			</header>
			<hr />
			<div className={styles.main}>{itemElements}</div>
		</Section>
	)
}
