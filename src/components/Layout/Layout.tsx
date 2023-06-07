import React from 'react'

import Header from './Header'
import Footer from './Footer'

import styles from '@styles/Layout/Layout.module.scss'
import { setLocalStorage } from '@/utils'

interface Props {
	children?: any
}
setLocalStorage({ formData: undefined })
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
