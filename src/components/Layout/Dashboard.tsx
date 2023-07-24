import React, { useCallback, useEffect, useMemo, useState } from 'react'

import useEvents from '@/hooks/Events/use-events'
import useAppContext from '@/hooks/Other/use-app-context'
import { className, getSessionStorage, setSessionStorage } from '@/utils'

import { DashboardProps as Props } from './types/Dashboard.modal'

import Section from '@/components/Layout/Section'
import LoadingIcon from '@/components/UI/LoadingIcon'
import Select from '@/components/UI/Select'
import DashboardControls from './Dashboard/DashboardControls'

import styles from '@styles/Layout/Dashboard.module.scss'
import defaultStyles from '@styles/styles.module.scss'

const maxSkip = 5
const perPageValues = [4, 6, 8, 10]
export default function Dashboard(props: Props) {
	// Checks if any perPage filter is set in session storage and stores default filter value based on that
	const defaultFilterValue = getSessionStorage()?.filters
		? +(getSessionStorage()?.filters['per-page-select'] ?? perPageValues[0])
		: perPageValues[0]

	const { getText } = useAppContext().Language
	const { getEvent, sortedDates } = useEvents()

	const [currentPage, setCurrentPage] = useState<number>(0)
	const [perPage, setPerPage] = useState<number>(defaultFilterValue)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { onEventsLoad } = props
	const pagesCount = useMemo(() => Math.max(Math.ceil(sortedDates.length / perPage), 1), [perPage, sortedDates.length])
	const perPageOptions = perPageValues.map((value) => ({
		value: value.toString(),
		selected: defaultFilterValue === value
	}))

	const clamp = useCallback(
		(value: number): number => {
			return Math.max(Math.min(value, pagesCount - 1), 0)
		},
		[pagesCount]
	)

	// Clamps current page
	useEffect(() => {
		setCurrentPage((page) => clamp(page))
	}, [clamp])

	useEffect(() => {
		if (!onEventsLoad) return
		const dates = sortedDates.slice(currentPage * perPage, currentPage * perPage + perPage)

		setIsLoading(true)
		Promise.all(dates.map((_, i) => getEvent(i, dates)))
			.then((events) => {
				onEventsLoad(events)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [currentPage, getEvent, perPage, onEventsLoad, sortedDates])

	const sectionStyles = className('' ?? defaultStyles.section, styles.section)

	function changeCurrentPage(event: React.MouseEvent<HTMLButtonElement>) {
		const pageChangeAmount = +(event.currentTarget.dataset.amount || 1)
		setCurrentPage((page) => clamp(page + pageChangeAmount))
	}
	function onFilterValueChange(value: string) {
		setPerPage(+value)
		setSessionStorage({
			filters: { ...getSessionStorage()?.filters, 'per-page-select': value }
		})
	}
	return (
		<Section title={props.name ?? getText('Dashboard')} className={props.className} contentClassName={sectionStyles}>
			<div className={styles.filter}>
				<label htmlFor="per-page-select">Show</label>
				<Select id="per-page-select" options={perPageOptions} getValue={onFilterValueChange} />
			</div>
			{isLoading && <LoadingIcon />}
			{!isLoading && <ul style={{ '--per-page': perPage } as React.CSSProperties}>{props.children}</ul>}
			<DashboardControls
				changeCurrentPage={changeCurrentPage}
				maxSkip={maxSkip}
				currentPage={currentPage}
				pagesCount={pagesCount}
			/>
		</Section>
	)
}
