import React, { useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import useEvents from '@/hooks/Events/use-events'
import useUserRedirect from '@/hooks/Other/use-user-redirect'

import Head from '@/components/Head'
import LoadingIcon from '@/components/UI/LoadingIcon'
import VehicleSelector from '@/components/Layout/Dashboard/VehicleSelector.tsx'
import Events from '@/components/pages/Dashboard/Events'
import Overview from '@/components/pages/Dashboard/Overview'
import Toggle from '@comp/UI/Toggle.tsx'

import styles from '@styles/pages/Dashboard/index.module.scss'

export default function Dashboard() {
	useUserRedirect()
	const {
		user,
		state: { isLoading: userIsLoading, isLoggedIn }
	} = useAppContext().Auth
	const { getText } = useAppContext().Language
	const { isLoading: eventsAreLoading } = useEvents()
	const [showArchived, setShowArchived] = useState<boolean>(false)

	if (userIsLoading || eventsAreLoading || !isLoggedIn) {
		return <LoadingIcon type="car" />
	}

	return (
		<>
			<Head
				title={`Fuely | ${getText('Dashboard')} - ${user.displayName}`}
				description={`Dashboard of ${user.displayName} user`}
			/>
			<div className={styles.bar}>
				<VehicleSelector allowNull showArchived={showArchived} noMarginBottom />
				<span className='text-end'>{getText('Archived')}</span>
				<Toggle defaultValue={showArchived} onInput={(v) => setShowArchived(v)} />
			</div>
			<Overview className={styles.overview} />
			<Events className={styles.events} />
		</>
	)
}
