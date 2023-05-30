import React from 'react'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'
import { getUnit } from '@/utils'
import useEvents from '@/hooks/use-events'

import Overview from '@/components/pages/Dashboard/Overview'
import DashboardComponent from '@/components/pages/Dashboard/Dashboard'
import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'

import styles from '@styles/pages/Dashboard/index.module.scss'

export default function Dashboard() {
	const { user, isLoading } = useAppContext().Auth
	const { events, sortedDates, formatDate } = useEvents()

	useUserRedirect()

	if (isLoading || !events || !user) {
		return <>Loading...</>
	}

	const dashboardItems = sortedDates.map((date) => {
		const event = events[date]
		return {
			id: date,
			cost: event.cost,
			costUnit: user.currency,
			fuel: event.fuel,
			fuelUnit: getUnit(user.fuelUnit),
			date: formatDate(date)
		}
	})

	return (
		<>
			<Overview
				className={styles.overview}
				date="23 May 2023"
				items={[
					{ label: 'Prize', currentValue: 250, previousValue: 230, unit: 'zł' },
					{ label: 'Fuel', currentValue: 35, previousValue: 30, unit: 'L' },
					{ label: 'Distance', currentValue: 412, previousValue: 389, unit: 'km', digits: 0 },
					{
						label: 'Consumption',
						currentValue: 8.38,
						previousValue: 8.87,
						unit: (
							<>
								<sup>L</sup>/<sub>100km</sub>
							</>
						),
						digits: 2
					}
				]}
			/>
			<Button className={styles['new-refuel-button']} onClick={() => {}}>
				<Icon type="fuelpump" alt="fuelpump icon" />
				<span>New Refuel</span>
			</Button>
			<hr className={styles.line} />
			<DashboardComponent className={styles.dashboard} items={dashboardItems} />
		</>
	)
}
