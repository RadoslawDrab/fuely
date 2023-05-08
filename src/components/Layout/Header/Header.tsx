import React from 'react'
import { useRouter } from 'next/router'

import styles from '@styles/Layout/Header/Header.module.scss'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import useAppContext from '@/hooks/use-app-context'

function Header() {
	const router = useRouter()
	const { toggleNavigation, navigationState } = useAppContext().Navigation

	function redirect() {
		const { query } = router
		if (query.userId) {
			router.replace(`/user/${router.query.userId}/`)
		} else {
			router.replace('/')
		}
	}

	return (
		<header className={styles.header}>
			<Button onClick={redirect}>
				<Icon type="logo" alt="logo icon" width={30} height={30} />
				<h1>Fuely</h1>
			</Button>
			<Button onClick={toggleNavigation}>
				<Icon type="equal" alt="navigation icon" width={30} height={30} />
			</Button>
			<nav className={!navigationState ? 'hidden' : ''}>Navigation</nav>
		</header>
	)
}

export default Header
