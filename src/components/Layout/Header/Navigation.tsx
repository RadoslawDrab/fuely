import React from 'react'
import { useRouter } from 'next/router'

import useAppContext from '@/hooks/Other/use-app-context'
import { className } from '@/utils'

import NavigationButtons from './NavigationButtons'
import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'

import styles from '@styles/Layout/Header/Navigation.module.scss'

export default function Navigation() {
	const router = useRouter()

	const { navigationState } = useAppContext().Navigation
	const {
		state: { isLoggedIn },
		logout
	} = useAppContext().Auth
	const { getText } = useAppContext().Language

	const navigationStyles = className(styles.nav, !navigationState ? 'hidden' : '')

	async function logoutUser() {
		await logout()
		await router.replace('/login')
		document.body.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<nav className={navigationStyles}>
			<ul>
				<NavigationButtons buttonsVariant="dark" />
				{isLoggedIn && (
					<li className="logout-item">
						<Button className="logout-button" onClick={logoutUser} variant="dark">
							<Icon type="arrow-square-out" alt="logout icon" />
							<span>{getText('Logout')}</span>
						</Button>
					</li>
				)}
			</ul>
		</nav>
	)
}
