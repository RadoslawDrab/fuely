import React, { useRef } from 'react'

import { className, setSessionStorage } from '@/utils'

import { LayoutProps as Props } from './types/Layout.modal'

import { LayoutContextWrapper } from '@/utils/LayoutContextWrapper'
import Notifications from './Notifications'
import Footer from './Footer/Footer'
import Header from './Header/Header'

import styles from '@styles/Layout/Layout.module.scss'

setSessionStorage({ formData: undefined })
function Layout(props: Props) {
	const mainContainerRef = useRef<HTMLElement>(null)
	const headerRef = useRef<HTMLElement>(null)
	const layoutStyles = className(styles.layout, 'layout')
	return (
		<LayoutContextWrapper value={{ mainContainerRef, headerRef }}>
			<div className={layoutStyles}>
				<Header ref={headerRef} />
				<main ref={mainContainerRef}>{props.children}</main>
				<Footer />
			</div>
			<Notifications />
		</LayoutContextWrapper>
	)
}

export default Layout
