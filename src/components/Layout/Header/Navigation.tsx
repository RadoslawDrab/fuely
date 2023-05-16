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
	const { isLoggedIn, logout } = useAppContext().Auth

	const navButtons: NavigationButton[] = [
		{
			name: 'Home',
			icon: 'house',
			path: '/',
			condition: () => true
		},
		{
			name: 'Dashboard',
			icon: 'rectangle.3.group',
			path: '/user/dashboard',
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
			name: 'Settings',
			icon: 'gearshape',
			path: '/user/settings',
			condition: () => isLoggedIn
		},
		{
			name: 'Logout',
			icon: 'arrow.up.right.square',
			path: null,
			condition: () => isLoggedIn,
			func: () => {
				router.replace('/user/login')
				logout()
			}
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
		if (!item.condition()) {
			return
		}
		const isCurrentPath = item.path === router.pathname

		// If `path` exists then navigates to that path. Otherwhise if `func` exists then executes that function
		function onClick(event: React.MouseEvent<HTMLButtonElement>) {
			if (item.path) {
				navigate(event)
			} else if (item.func) item.func()
		}
		return (
			<li key={i}>
				<Button
					onClick={onClick}
					className={`${item.name.toLowerCase()}-button ${isCurrentPath ? 'selected' : ''}`}
					data={item.path ? { path: item.path } : {}}>
					<Icon type={item.icon} alt={`${item.name} icon`} />
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
