import { useEffect } from 'react'

import usePages from '../Pages/use-pages'
import useAppContext from './use-app-context'

export default function useUserRedirect() {
	const { redirect } = usePages()

	const {
		state: { errorMessage, isLoggedIn }
	} = useAppContext().Auth

	useEffect(() => {
		if (errorMessage.includes('no-data') || !isLoggedIn) {
			redirect('/login')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errorMessage])
}
