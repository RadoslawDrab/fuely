import React from 'react'
import { useRouter } from 'next/router'

import useAppContext from '@/hooks/use-app-context'

import { className } from '@/utils'

import { NavigationButton } from '@/types/Layout/Header/Navigation.modal'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'

import styles from '@styles/Layout/Header/Navigation.module.scss'

export default function Navigation() {
	const router = useRouter()

	const { navigationState } = useAppContext().Navigation
	const { isLoggedIn } = useAppContext().Auth

	const navButtons: NavigationButton[] = [
		{
			name: 'Home',
			icon: 'house',
			path: '/'
		},
		{
			name: 'Dashboard',
			icon: 'rectangle.3.group',
			path: '/user/[userId]',
			condition: () => isLoggedIn
		},
		{
			name: 'Login',
			icon: 'person.crop.circle',
			path: '/user/login',
			condition: () => !isLoggedIn
		},
		{
			name: 'Register',
			icon: 'person.crop.circle.badge.plus',
			path: '/user/register',
			condition: () => !isLoggedIn
		},
		{
			name: 'Account',
			icon: 'person',
			path: '/user/account',
			condition: () => isLoggedIn
		},
		{
			name: 'Settings',
			icon: 'gearshape',
			path: '/settings'
		}
	]

	const navigationStyles = className(styles.nav, !navigationState ? 'hidden' : '')

	// Changes url based on path
	function navigate(event: React.MouseEvent<HTMLButtonElement>) {
		const url = event.currentTarget.dataset.path ?? '/'
		router.replace(url)
	}

	const navigationButtons = navButtons.map((item, i) => {
		// Checks if condition is met
		if (item.condition && !item.condition()) {
			return
		}
		return (
			<li key={i}>
				<Button onClick={navigate} data={{ path: item.path }}>
					<Icon type={item.icon} alt={`${item.name} icon`} width={40} height={40} />
					<span>{item.name}</span>
				</Button>
			</li>
		)
	})
	return (
		<nav className={navigationStyles}>
			<ul>{navigationButtons}</ul>
		</nav>
	)
}
