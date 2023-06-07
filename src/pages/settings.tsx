import Head from 'next/head'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import LoadingIcon from '@/components/UI/LoadingIcon'

export default function Settings(props: any) {
	const {
		user,
		state: { isLoading }
	} = useAppContext().Auth

	useUserRedirect()

	if (isLoading) {
		return <LoadingIcon />
	}

	return (
		<>
			<Head>
				<title>Fuely | Settings - {user.displayName}</title>
				<meta name="description" content={`${user.displayName} settings page`} />
			</Head>
			Settings
		</>
	)
}
