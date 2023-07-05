import React, { useRef } from 'react'

import { className, setSessionStorage } from '@/utils'

import { LayoutProps as Props } from './types/Layout.modal'

import Footer from './Footer'
import Header from './Header'
import { LayoutContextWrapper } from '@/utils/LayoutContextWrapper'

import styles from '@styles/Layout/Layout.module.scss'

setSessionStorage({ formData: undefined })
function Layout(props: Props) {
	const mainContainerRef = useRef<HTMLElement>(null)

	const layoutStyles = className(styles.layout, 'layout')
	return (
		<LayoutContextWrapper value={{ mainContainerRef: mainContainerRef }}>
			<div className={layoutStyles}>
				<Header />
				<main ref={mainContainerRef}>{props.children}</main>
				<Footer />
			</div>
		</LayoutContextWrapper>
	)
}

export default Layout
