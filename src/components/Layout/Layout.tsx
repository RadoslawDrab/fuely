import React from 'react'
import Header from './Header'
import Footer from './Footer/Footer'
// import styles from './Layout.module.scss';

interface Props {
	children?: any
}
function Layout(props: Props) {
	return (
		<div>
			<Header />
			<main>{props.children}</main>
			<Footer />
		</div>
	)
}

export default Layout
