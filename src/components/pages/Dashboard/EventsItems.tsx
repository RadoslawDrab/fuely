import React, { useMemo } from 'react'

import useUnit from '@/hooks/Other/use-unit'
import usePages from '@/hooks/Pages/use-pages'
import { getRandomKey } from '@/utils'

import { EventsItem, EventsItemsProps as Props } from './types/Events.modal'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'

import styles from '@styles/pages/Dashboard/EventsItems.module.scss'

export default function EventsItem(props: Props) {
	const { convertIfImperial, units } = useUnit()
	const { redirect } = usePages()

	const dashboardItems: EventsItem[] = useMemo(() => {
		return props.events.map((event) => {
			return {
				id: event.fullId,
				cost: event.cost,
				costUnit: units.currency.toUpperCase(),
				fuel: convertIfImperial(event.fuel, 'fuel'),
				fuelUnit: units.fuel,
				date: event.date
			}
		})
	}, [convertIfImperial, props.events, units.currency, units.fuel])
	const rows = dashboardItems.map((item, i) => {
		const date = item.date
		const cost = item.cost
		const fuelAmount = item.fuel
		const key = `${i}-${getRandomKey()}`
		return (
			<li key={key} className={styles.item}>
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
	function navigate(event: React.MouseEvent<HTMLButtonElement>) {
		const path: any = `/${event.currentTarget.dataset.id}` || '/dashboard'
		redirect(path)
	}
	return <>{rows}</>
}
