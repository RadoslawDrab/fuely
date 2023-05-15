import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import useAppContext from '@/hooks/use-app-context'

import Layout from '@/components/Layout/Layout'

export default function Dashboard() {
	// const router = useRouter()
	const { user, isLoading } = useAppContext().Auth

	useEffect(() => {
		// console.log(user)
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
