import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import usePages from '@/hooks/Pages/use-pages'
import { className } from '@/utils'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import NavigationButtons from './NavigationButtons'

import styles from '@styles/Layout/Header/Navigation.module.scss'

export default function Navigation() {
	const { navigationState, setNavigation } = useAppContext().Navigation
	const {
		state: { isLoggedIn },
		logout
	} = useAppContext().Auth
	const { getText } = useAppContext().Language
	const { redirect } = usePages()

	const navigationStyles = className(styles.nav, !navigationState ? styles.hidden : '')

	async function logoutUser() {
		await logout()
		redirect('/login', 'replace')
		setNavigation(false)
	}

	return (
		<nav className={navigationStyles}>
			<ul>
				<NavigationButtons buttonsVariant="dark" />
				{isLoggedIn && (
					<li className="logout-item">
						<Button className="logout-button" onClick={logoutUser} variant="dark">
							<Icon type="arrow-square-out" alt="logout icon" />
							<span>{getText('Log out')}</span>
						</Button>
					</li>
				)}
			</ul>
		</nav>
	)
}
