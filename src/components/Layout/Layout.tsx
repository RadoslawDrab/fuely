import React from 'react'

import Header from './Header'
import Footer from './Footer/Footer'

import styles from '@styles/Layout/Layout.module.scss'

interface Props {
	children?: any
}
function Layout(props: Props) {
	return (
		<div className={styles.layout}>
			<Header />
			<main>{props.children}</main>
			<Footer />
		</div>
	)
}

export default Layout
