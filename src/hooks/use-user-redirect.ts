import { useEffect } from 'react'
import { useRouter } from 'next/router'

import useAppContext from './use-app-context'

export default function useUserRedirect() {
	const router = useRouter()

	const {
		state: { errorMessage }
	} = useAppContext().Auth

	useEffect(() => {
		if (errorMessage.includes('Unauthorized')) {
			router.replace('/user/login')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errorMessage])
}
