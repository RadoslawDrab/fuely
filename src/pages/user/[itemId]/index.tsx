import React from 'react'
import { useRouter } from 'next/router'

export default function Item(props: any) {
	const router = useRouter()

	return <>Item - {router.query.itemId} </>
}
