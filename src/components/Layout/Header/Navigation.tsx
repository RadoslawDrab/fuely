import React from 'react'
import useAppContext from '@/hooks/use-app-context'

import { className } from '@/utils'

import { NavigationButton } from '@/types/Layout/Header/Navigation.modal'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'

import styles from '@styles/Layout/Header/Navigation.module.scss'

const navButtons: NavigationButton[] = [
	{
		name: 'Home',
		icon: 'house',
		path: '/'
	},
	{
		name: 'Dashboard',
		icon: 'rectangle.3.group',
		path: '/user/[userId]'
	},
	{
		name: 'Login',
		icon: 'person.crop.circle',
		path: '/user/login'
	},
	{
		name: 'Register',
		icon: 'person.crop.circle.badge.plus',
		path: '/user/register'
	},
	{
		name: 'Account',
		icon: 'person',
		path: '/user/account'
	},
	{
		name: 'Settings',
		icon: 'gearshape',
		path: '/settings'
	}
]
export default function Navigation() {
	const { navigationState } = useAppContext().Navigation

	const navigationStyles = className(styles.nav, !navigationState ? 'hidden' : '')

	function navigate(event: React.MouseEvent<HTMLButtonElement>) {
	}

	const navigationButtons = navButtons.map((item, i) => {
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
