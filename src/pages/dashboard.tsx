import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

import useAppContext from '@/hooks/use-app-context'
import useEvents from '@/hooks/use-events'
import useUserRedirect from '@/hooks/use-user-redirect'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import LoadingIcon from '@/components/UI/LoadingIcon'
import DashboardComponent from '@/components/pages/Dashboard/Dashboard'
import Overview from '@/components/pages/Dashboard/Overview'

import styles from '@styles/pages/Dashboard/index.module.scss'

export default function Dashboard() {
	const router = useRouter()

	const {
		user,
		state: { isLoading: userIsLoading, isLoggedIn }
	} = useAppContext().Auth
	const { getText } = useAppContext().Language
	const { isLoading: eventsAreLoading } = useEvents()

	useUserRedirect()

	if (userIsLoading || eventsAreLoading || !isLoggedIn) {
		return <LoadingIcon />
	}

	function refuelButtonClick() {
		router.push('/refuel')
	}

	return (
		<>
			<Head>
				<title>Fuely | Dashboard - {user.displayName}</title>
				<meta name="description" content={`Dashboard of ${user.displayName} user`} />
			</Head>
			<Overview className={styles.overview} />
			<Button className={styles['refuel-button']} onClick={refuelButtonClick}>
				<Icon type="fuelpump" alt="fuelpump icon" />
				<span>{getText('Refuel')}</span>
			</Button>
			<hr className={styles.line} />
			<DashboardComponent className={styles.dashboard} />
		</>
	)
}
