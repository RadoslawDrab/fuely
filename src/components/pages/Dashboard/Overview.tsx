import React, { useEffect, useMemo, useState } from 'react'

import useEvents from '@/hooks/Events/use-events'
import useUnit from '@/hooks/Other/use-unit'
import { className, getRandomKey } from '@/utils'
import useAppContext from '@/hooks/Other/use-app-context'

import { FullEvent } from '@/hooks/Events/types/Events.modal'
import { OverviewItem, OverviewProps as Props } from './types/Overview.modal'

import Section from '@/components/Layout/Section'
import Graph from '@/components/UI/Graph'

import styles from '@styles/pages/Dashboard/Overview.module.scss'
import defaultStyles from '@styles/styles.module.scss'

export default function Overview(props: Props) {
	const { getText } = useAppContext().Language
	const { events, getEvent, isLoading, emptyEvent } = useEvents()
	const { isMetric, units } = useUnit()

	const [event0, setEvent0] = useState<FullEvent>(emptyEvent)
	const [event1, setEvent1] = useState<FullEvent>(emptyEvent)

	// Styling
	const sectionStyles = className(defaultStyles.section, styles.section)

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

	const items: OverviewItem[] = useMemo(() => {
		// Last consumption
		const currentConsumption = (isMetric ? (event0.fuel / event0.distance) * 100 : event0.distance / event0.fuel) ?? 0
		// Second to last consumption
		const previousConsumption = (isMetric ? (event1.fuel / event1.distance) * 100 : event1.distance / event1.fuel) ?? 0

		return [
			{ label: getText('Cost'), currentValue: event0.cost, previousValue: event1.cost, unit: event0.currency.toUpperCase() },
			{ label: getText('Fuel'), currentValue: event0.fuel, previousValue: event1.fuel, unit: units.fuel },
			{
				label: getText('Distance'),
				currentValue: event0.distance,
				previousValue: event1.distance,
				unit: units.distance,
				digits: 0
			},
			{
				label: getText('Fuel/Distance'),
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
			},
			{
				label: getText('Cost/Fuel'),
				currentValue: event0.cost / event0.fuel,
				previousValue: event1.cost / event1.fuel,
				unit: (
					<>
						<sup>{units.currency.toUpperCase()}</sup>/<sub>{units.fuel}</sub>
					</>
				)
			},
			{
				label: getText('Distance/Cost'),
				currentValue: event0.distance / event0.cost,
				previousValue: event1.distance / event1.cost,
				unit: (
					<>
						<sup>{units.distance}</sup>/<sub>{units.currency.toUpperCase()}</sub>
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
		getText,
		isMetric,
		units.currency,
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
						{ tooltip: value, value: currentValue || max },
						{ tooltip: prevValue, value: previousValue || max }
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

	const content = (() => {
		if (!event0.fullId || !event1.fullId) return <span>No data</span>
		return itemElements
	})()
	return (
		<Section title={getText('Overview')} className={props.className} contentClassName={sectionStyles}>
			<header>
				<h3>{getText('Last refuel')}</h3>
				<time dateTime={event0?.date}>{event0?.date}</time>
			</header>
			<hr />
			<div className={styles.main}>{content}</div>
		</Section>
	)
}
