import React from 'react'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

export default function Dashboard() {
	const { user, isLoading } = useAppContext().Auth

	useUserRedirect()

	if (isLoading) {
		return <>Loading...</>
	}

	return <>Welcome {user?.settings.name}</>
}
