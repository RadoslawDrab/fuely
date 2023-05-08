import React from 'react'
import useAppContext from '@/hooks/use-app-context'

import { className } from '@/utils'

import styles from '@styles/Layout/Header/Navigation.module.scss'

export default function Navigation() {
	const { navigationState } = useAppContext().Navigation

	const navigationStyles = className(styles.nav, !navigationState ? 'hidden' : '')
	return <nav className={navigationStyles}>Navigation</nav>
}
