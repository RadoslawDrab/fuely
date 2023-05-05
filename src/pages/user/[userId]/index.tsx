import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'
import React from 'react'

export default function Dashboard(props: any) {
	const router = useRouter()

	return (
		<>
			<Layout>Dashboard - {router.query.userId}</Layout>
		</>
	)
}
