import { useRouter } from 'next/router'
import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import useEvents from '@/hooks/Events/use-events'
import useUserRedirect from '@/hooks/Other/use-user-redirect'

import Head from '@/components/Head'
import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import LoadingIcon from '@/components/UI/LoadingIcon'
import MainDashboard from '@/components/pages/Dashboard/MainDashboard'
import Overview from '@/components/pages/Dashboard/Overview'

import styles from '@styles/pages/Dashboard/index.module.scss'

export default function Dashboard() {
	const router = useRouter()

	useUserRedirect()
	const {
		user,
		state: { isLoading: userIsLoading, isLoggedIn }
	} = useAppContext().Auth
	const { getText } = useAppContext().Language
	const { isLoading: eventsAreLoading } = useEvents()

	if (userIsLoading || eventsAreLoading || !isLoggedIn) {
		return <LoadingIcon />
	}

	function refuelButtonClick() {
		router.push('/refuel')
	}

	return (
		<>
			<Head title={`Fuely | Dashboard - ${user.displayName}`} description={`Dashboard of ${user.displayName} user`} />
			<Overview className={styles.overview} />
			<hr className={styles.line} />
			<MainDashboard className={styles.dashboard} />
			<Button className={styles['refuel-button']} onClick={refuelButtonClick}>
				<span>{getText('Refuel')}</span>
				<Icon type="gas-pump" alt="fuelpump icon" />
			</Button>
		</>
	)
}
