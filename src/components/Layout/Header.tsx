import React from 'react'
import { useRouter } from 'next/router'

import useAppContext from '@/hooks/use-app-context'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import Navigation from './Header/Navigation'

import styles from '@styles/Layout/Header.module.scss'

function Header() {
	const router = useRouter()

	const { toggleNavigation } = useAppContext().Navigation

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
			<Button className="logo-button" onClick={redirect}>
				<Icon type="logo" alt="logo icon" />
				<h1>Fuely</h1>
			</Button>
			<Button className="nav-button" onClick={toggleNavigation}>
				<Icon type="equal" alt="navigation icon" />
			</Button>
			<Navigation />
		</header>
	)
}

export default Header
