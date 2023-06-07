import React from 'react'
import { useRouter } from 'next/router'

import useAppContext from '@/hooks/use-app-context'
import { className } from '@/utils'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import Navigation from './Header/Navigation'

import styles from '@styles/Layout/Header.module.scss'

function Header() {
	const router = useRouter()

	const { toggleNavigation, navigationState } = useAppContext().Navigation
	const {
		state: { isLoggedIn }
	} = useAppContext().Auth

	const navButtonStyles = className(styles['nav-button'], navigationState ? styles['active'] : '')

	function redirect() {
		if (isLoggedIn) {
			router.push(`/dashboard`)
		} else {
			router.push('/')
		}
	}

	return (
		<header className={styles.header}>
			<Button className={styles['logo-button']} onClick={redirect} variant="dark">
				<Icon type="logo" alt="logo icon" />
				<h1>Fuely</h1>
			</Button>
			<Button className={navButtonStyles} onClick={toggleNavigation} variant="dark">
				<Icon type="equal" alt="navigation icon" />
			</Button>
			<Navigation />
		</header>
	)
}

export default Header
