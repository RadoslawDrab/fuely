import { useRouter } from 'next/router'
import React, { useRef } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { className, setSessionStorage } from '@/utils'

import { LayoutProps as Props } from './types/Layout.modal'

import { LayoutContextWrapper } from '@/utils/LayoutContextWrapper'
import FloatingButton from '../UI/FloatingButton'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Notifications from './Notifications'

import styles from '@styles/Layout/Layout.module.scss'

setSessionStorage({ formData: undefined })

function Layout(props: Props) {
	const router = useRouter()
	const mainContainerRef = useRef<HTMLElement>(null)
	const headerRef = useRef<HTMLElement>(null)

	const {
		state: { isLoggedIn }
	} = useAppContext().Auth

	const layoutStyles = className(styles.layout, 'layout')
	const floatingButtonsStyles = className(styles['floating-buttons'], 'floating-buttons')

	function refuelButtonClick() {
		router.push('/refuel')
	}

	return (
		<LayoutContextWrapper value={{ mainContainerRef, headerRef }}>
			<div className={layoutStyles}>
				<Header ref={headerRef} />
				<main ref={mainContainerRef}>
					{props.children}
					<div className={floatingButtonsStyles}>
						{isLoggedIn && (
							<FloatingButton useParent iconType="gas-pump" iconAlt="refuel icon" text="Refuel" onClick={refuelButtonClick} />
						)}
					</div>
				</main>
				<Footer />
			</div>
			<Notifications />
		</LayoutContextWrapper>
	)
}

export default Layout
