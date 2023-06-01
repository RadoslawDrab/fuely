import React from 'react'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'
import useEvents from '@/hooks/use-events'
import useUnit from '@/hooks/use-unit'

import Overview from '@/components/pages/Dashboard/Overview'
import DashboardComponent from '@/components/pages/Dashboard/Dashboard'
import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'

import styles from '@styles/pages/Dashboard/index.module.scss'

export default function Dashboard() {
	const {
		user,
		state: { isLoading }
	} = useAppContext().Auth
	const { events, sortedDates, formatDate, convertIfImperial } = useEvents()
	const { units } = useUnit()

	useUserRedirect()

	if (isLoading || !events || !user) {
		return <>Loading...</>
	}

	const dashboardItems = sortedDates.map((date) => {
		const event = events[date]
		return {
			id: date,
			cost: event.cost,
			costUnit: units.currency,
			fuel: convertIfImperial(event.fuel, 'fuel'),
			fuelUnit: units.fuel,
			date: formatDate(date)
		}
	})

	return (
		<>
			<Overview className={styles.overview} />
			<Button className={styles['new-refuel-button']} onClick={() => {}}>
				<Icon type="fuelpump" alt="fuelpump icon" />
				<span>New Refuel</span>
			</Button>
			<hr className={styles.line} />
			<DashboardComponent className={styles.dashboard} items={dashboardItems} />
		</>
	)
}
