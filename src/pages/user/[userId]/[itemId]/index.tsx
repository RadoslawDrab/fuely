import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'
import React from 'react'

export default function Item(props: any) {
	const router = useRouter()

	return (
		<>
			<Layout>Item - {router.query.itemId}</Layout>
		</>
	)
}
