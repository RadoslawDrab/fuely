import React from 'react'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout/Layout'

export default function Item(props: any) {
	const router = useRouter()

	return (
		<>
			<Layout>Item - {router.query.itemId}</Layout>
		</>
	)
}
