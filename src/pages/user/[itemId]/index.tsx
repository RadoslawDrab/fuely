import React from 'react'
import { useRouter } from 'next/router'
import useUserRedirect from '@/hooks/use-user-redirect'

export default function Item(props: any) {
	const router = useRouter()

	useUserRedirect()

	return <>Item - {router.query.itemId} </>
}
