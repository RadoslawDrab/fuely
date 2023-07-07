import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

import useEvents from '@/hooks/Events/use-events'
import useUnit from '@/hooks/Other/use-unit'
import { className, getRandomKey } from '@/utils'
import useAppContext from '@/hooks/Other/use-app-context'

import { FullEvent } from '@/hooks/Events/types/Events.modal'
import { DashboardItem, DashboardProps as Props } from './types/Dashboard.modal'

import Section from '@/components/Layout/Section'
import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'

import styles from '@styles/pages/Dashboard/Dashboard.module.scss'
import defaultStyles from '@styles/styles.module.scss'

export default function Dashboard(props: Props) {
	const router = useRouter()

	const { getText } = useAppContext().Language
	const { getEvent, sortedDates } = useEvents()
	const { convertIfImperial } = useUnit()
	const { units } = useUnit()

	const [dashboardEvents, setDashboardEvents] = useState<FullEvent[]>([])

	useEffect(() => {
		Promise.all(sortedDates.map((_, i) => getEvent(i))).then((events) => {
			setDashboardEvents(() => events)
		})
	}, [getEvent, sortedDates])

	const dashboardItems: DashboardItem[] = useMemo(() => {
		return dashboardEvents.map((event) => {
			return {
				id: event.fullId,
				cost: event.cost,
				costUnit: units.currency.toUpperCase(),
				fuel: convertIfImperial(event.fuel, 'fuel'),
				fuelUnit: units.fuel,
				date: event.date
			}
		})
	}, [convertIfImperial, dashboardEvents, units.currency, units.fuel])

	const sectionStyles = className(defaultStyles.section, styles.section)

	function navigate(event: React.MouseEvent<HTMLButtonElement>) {
		const path = `/${event.currentTarget.dataset.id}` || '/dashboard'

		router.push(path)
	}

	const rows = dashboardItems.map((item, i) => {
		const date = item.date
		const cost = item.cost
		const fuelAmount = item.fuel
		const key = `${i}-${getRandomKey()}`
		return (
			<li key={key}>
				<data className={styles.date} value={date}>
					{date}
				</data>
				<data className={styles.cost} value={cost}>
					{cost.toFixed(2)}
					<span>{item.costUnit}</span>
				</data>
				<data className={styles.fuel} value={fuelAmount}>
					{fuelAmount.toFixed(1)}
					<span>{item.fuelUnit}</span>
				</data>
				<Button className={styles.button} onClick={navigate} data={{ id: item.id }} variant={'redirect'}>
					<Icon type="caret-right" alt="right arrow icon" />
				</Button>
			</li>
		)
	})
	return (
		<Section title={getText('Dashboard')} className={props.className} contentClassName={sectionStyles}>
			{rows.length > 0 && <ul>{rows}</ul>}
			{rows.length <= 0 && <span>No events</span>}
		</Section>
	)
}
