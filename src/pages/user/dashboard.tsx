import React from 'react'

import useAppContext from '@/hooks/use-app-context'

export default function Dashboard() {
	const { user, isLoading } = useAppContext().Auth

	if (isLoading) {
		return <>Loading...</>
	}

	return <>Welcome {user?.settings.name}</>
}
