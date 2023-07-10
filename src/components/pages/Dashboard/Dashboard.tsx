import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

import useEvents from '@/hooks/Events/use-events'
import useAppContext from '@/hooks/Other/use-app-context'
import useUnit from '@/hooks/Other/use-unit'
import { className, getRandomKey } from '@/utils'

import { FullEvent } from '@/hooks/Events/types/Events.modal'
import { DashboardItem, DashboardProps as Props } from './types/Dashboard.modal'

import Section from '@/components/Layout/Section'
import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import LoadingIcon from '@/components/UI/LoadingIcon'
import Select from '@/components/UI/Select'

import styles from '@styles/pages/Dashboard/Dashboard.module.scss'
import defaultStyles from '@styles/styles.module.scss'

const maxSkip = 5
const perPageValues = [3, 5, 10]
const perPageOptions = perPageValues.map((value) => ({ value: value.toString() }))
export default function Dashboard(props: Props) {
	const router = useRouter()

	const { getText } = useAppContext().Language
	const { getEvent, sortedDates } = useEvents()
	const { convertIfImperial } = useUnit()
	const { units } = useUnit()

	const [dashboardEvents, setDashboardEvents] = useState<FullEvent[]>([])
	const [currentPage, setCurrentPage] = useState<number>(0)
	const [perPage, setPerPage] = useState<number>(perPageValues[0])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const pagesCount = Math.ceil(sortedDates.length / perPage)

	useEffect(() => {
		const dates = sortedDates.slice(currentPage * perPage, currentPage * perPage + perPage)

		setIsLoading(true)
		Promise.all(dates.map((_, i) => getEvent(i, dates)))
			.then((events) => {
				setDashboardEvents(events)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [currentPage, getEvent, perPage, sortedDates])

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
	function clamp(value: number): number {
		return Math.max(Math.min(value, pagesCount - 1), 0)
	}
	function changeCurrentPage(event: React.MouseEvent<HTMLButtonElement>) {
		const pageChangeAmount = +(event.currentTarget.dataset.amount || 1)
		setCurrentPage((page) => clamp(page + pageChangeAmount))
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
			<div className={styles.filter}>
				<label htmlFor="per-page-select">Show</label>
				<Select id="per-page-select" options={perPageOptions} getValue={(value) => setPerPage(+value)} />
			</div>
			{isLoading && <LoadingIcon />}
			{!isLoading && rows.length > 0 && <ul style={{ '--per-page': perPage } as React.CSSProperties}>{rows}</ul>}
			{!isLoading && rows.length <= 0 && <span>No events</span>}
			<div className={styles.controls}>
				<Button onClick={changeCurrentPage} data={{ amount: -maxSkip }} variant="redirect">
					<Icon type="caret-double-left" alt="previous page icon" />
				</Button>
				<Button onClick={changeCurrentPage} data={{ amount: -1 }} variant="redirect">
					<Icon type="caret-left" alt="previous page icon" />
				</Button>
				<span>{currentPage + 1}</span>
				<Button onClick={changeCurrentPage} data={{ amount: 1 }} variant="redirect">
					<Icon type="caret-right" alt="next page icon" />
				</Button>
				<Button onClick={changeCurrentPage} data={{ amount: maxSkip }} variant="redirect">
					<Icon type="caret-double-right" alt="next page icon" />
				</Button>
			</div>
		</Section>
	)
}
