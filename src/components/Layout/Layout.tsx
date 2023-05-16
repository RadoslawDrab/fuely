import React, { useEffect } from 'react'

import useAppContext from '@/hooks/use-app-context'

import Header from './Header'
import Footer from './Footer/Footer'
// import styles from './Layout.module.scss';

interface Props {
	children?: any
}
function Layout(props: Props) {
	const { user } = useAppContext().Auth
	const { setTheme } = useAppContext().Theme
	const { setLanguage } = useAppContext().Language

	useEffect(() => {
		if (user) {
			setLanguage(user.settings.language)
			setTheme(user.settings.theme === 'dark')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return (
		<div>
			<Header />
			<main>{props.children}</main>
			<Footer />
		</div>
	)
}

export default Layout
