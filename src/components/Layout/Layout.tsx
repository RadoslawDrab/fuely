import React from 'react'

import { className, setSessionStorage } from '@/utils'

import { LayoutProps as Props } from './types/Layout.modal'

import Footer from './Footer'
import Header from './Header'

import styles from '@styles/Layout/Layout.module.scss'

setSessionStorage({ formData: undefined })
function Layout(props: Props) {
	const layoutStyles = className(styles.layout, 'layout')
	return (
		<div className={layoutStyles}>
			<Header />
			<main>{props.children}</main>
			<Footer />
		</div>
	)
}

export default Layout
