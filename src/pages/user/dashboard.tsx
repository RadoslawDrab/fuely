import React, { useEffect } from 'react'

import useAppContext from '@/hooks/use-app-context'

import Layout from '@/components/Layout/Layout'

export default function Dashboard() {
	const { user, isLoading } = useAppContext().Auth
	const { setTheme } = useAppContext().Theme
	const { setLanguage } = useAppContext().Language

	useEffect(() => {
		if (user) {
			setLanguage(user.settings.language)
			setTheme(user.settings.theme === 'dark')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	if (isLoading) {
		return <Layout>Loading...</Layout>
	}

	return (
		<>
			<Layout>Welcome {user?.id}</Layout>
		</>
	)
}
