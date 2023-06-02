import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

import { FullEvent } from '@/hooks/Events.modal'
import useEvents from '@/hooks/use-events'
import useUnit from '@/hooks/use-unit'
import { className, getRandomKey } from '@/utils'

import Section from '@/components/Layout/Section'
import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'

import styles from '@styles/pages/Dashboard/Dashboard.module.scss'
import defaultStyles from '@styles/styles.module.scss'

interface Props {
	className?: string
}
interface Item {
	id: string
	date: string
	cost: number
	costUnit: string
	fuel: number
	fuelUnit: string
}
export default function Dashboard(props: Props) {
	const router = useRouter()

	const { getEvent, sortedDates, convertIfImperial } = useEvents()
	const { units } = useUnit()

	const [dashboardEvents, setDashboardEvents] = useState<FullEvent[]>([])

	useEffect(() => {
		Promise.all(sortedDates.map((_, i) => getEvent(i))).then((events) => {
			setDashboardEvents(() => events)
		})
	}, [getEvent, sortedDates])

	const dashboardItems: Item[] = useMemo(() => {
		return dashboardEvents.map((event) => {
			return {
				id: event.date,
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
		const path = `/user/${event.currentTarget.dataset.id}` || '/user/dashboard'

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
				<Button className={styles.button} onClick={navigate} data={{ id: item.id }}>
					<Icon type="arrow.right" alt="right arrow icon" />
				</Button>
			</li>
		)
	})
	return (
		<Section title="Dashboard" className={props.className} contentClassName={sectionStyles}>
			{rows.length > 0 && (
				<>
					<ul>{rows}</ul>
					<Button className={styles['load-button']} onClick={() => {}}>
						Load more
					</Button>
				</>
			)}
			{rows.length <= 0 && <span>No events</span>}
		</Section>
	)
}
