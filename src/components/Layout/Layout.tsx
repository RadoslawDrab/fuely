import React from 'react'

import { setSessionStorage } from '@/utils'

import Header from './Header'
import Footer from './Footer'

import styles from '@styles/Layout/Layout.module.scss'

interface Props {
	children?: any
}
setSessionStorage({ formData: undefined })
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
