import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import usePages from '@/hooks/Pages/use-pages'
import { className } from '@/utils'

import { HeaderProps as Props } from '../types/Header.modal'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import Navigation from './Navigation'

import styles from '@styles/Layout/Header/Header.module.scss'

export default React.forwardRef(function Header(props: Props, ref: React.ForwardedRef<HTMLElement>) {
	const { toggleNavigation, navigationState } = useAppContext().Navigation
	const {
		state: { isLoggedIn }
	} = useAppContext().Auth
	const { redirect } = usePages()

	const headerStyles = className(styles.header, props.disableStickiness ? styles['disable-stickiness'] : '')
	const navButtonStyles = className(styles['nav-button'], navigationState ? styles['active'] : '')

	function redirectToHome() {
		redirect(isLoggedIn ? `/dashboard` : '/')
	}

	return (
		<header ref={ref} className={headerStyles}>
			<Button className={styles['logo-button']} onClick={redirectToHome} variant="dark">
				<Icon type="logo" alt="logo icon" />
				<h1>Fuely</h1>
			</Button>
			<Button className={navButtonStyles} onClick={toggleNavigation} variant="dark">
				<Icon type="equals" alt="navigation icon" />
			</Button>
			<Navigation />
			<ul className="notifications"></ul>
		</header>
	)
})
