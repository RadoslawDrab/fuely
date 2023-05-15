import { useEffect } from 'react'
import { useRouter } from 'next/router'

import useAppContext from './use-app-context'

export default function useUserRedirect() {
	const router = useRouter()
	const { isLoggedIn } = useAppContext().Auth

	useEffect(() => {
		if (isLoggedIn) {
			router.replace('/user/dashboard')
		}
	}, [isLoggedIn, router])
}
