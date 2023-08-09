import { useRouter } from 'next/router'
import React, { useRef } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import usePages from '@/hooks/Pages/use-pages'
import { className } from '@/utils'

import { LayoutProps as Props } from './types/Layout.modal'

import { LayoutContextWrapper } from '@/utils/LayoutContextWrapper'
import FloatingButton from '../UI/FloatingButton'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Notifications from './Notifications'

import styles from '@styles/Layout/Layout.module.scss'

function Layout(props: Props) {
	const router = useRouter()
	const mainContainerRef = useRef<HTMLElement>(null)
	const headerRef = useRef<HTMLElement>(null)

	const {
		state: { isLoggedIn }
	} = useAppContext().Auth
	const { isDarkTheme, toggleTheme } = useAppContext().Theme
	const { getText } = useAppContext().Language
	const { redirect } = usePages()

	const layoutStyles = className(styles.layout, 'layout')
	const floatingButtonsStyles = className(styles['floating-buttons'], 'floating-buttons')

	const disableGenericStyling = router.asPath === '/'

	function refuelButtonClick() {
		redirect('/refuel')
	}

	return (
		<LayoutContextWrapper value={{ mainContainerRef, headerRef }}>
			<div className={layoutStyles}>
				<Header ref={headerRef} disableStickiness={disableGenericStyling} />
				<main ref={mainContainerRef} className={disableGenericStyling ? styles['disable-generic-styling'] : ''}>
					{props.children}
					<div className={floatingButtonsStyles}>
						{isLoggedIn && (
							<FloatingButton
								useParent
								iconType="gas-pump"
								iconAlt="refuel icon"
								text={getText('Refuel')}
								onClick={refuelButtonClick}
							/>
						)}
						<FloatingButton
							useParent
							iconType={isDarkTheme ? 'sun' : 'moon'}
							iconAlt="theme icon"
							text={isDarkTheme ? getText('Light') : getText('Dark')}
							onClick={toggleTheme}
						/>
					</div>
				</main>
				<Footer />
			</div>
			<Notifications />
		</LayoutContextWrapper>
	)
}

export default Layout
