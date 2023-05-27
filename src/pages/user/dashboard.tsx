import React from 'react'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import Overview from '@/components/pages/Dashboard/Overview'
import DashboardComponent from '@/components/pages/Dashboard/Dashboard'
import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'

import styles from '@styles/pages/Dashboard/index.module.scss'

export default function Dashboard() {
	const { user, isLoading } = useAppContext().Auth

	useUserRedirect()

	if (isLoading) {
		return <>Loading...</>
	}

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
			<DashboardComponent
				className={styles.dashboard}
				items={[
					{ id: '123456', cost: 250, costUnit: 'zł', fuel: 35, fuelUnit: 'L', date: '23 May 2023' },
					{ id: '123456', cost: 250, costUnit: 'zł', fuel: 35, fuelUnit: 'L', date: '23 May 2023' }
				]}
			/>
		</>
	)
}
