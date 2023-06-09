import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import Head from '@/components/Head'
import LoadingIcon from '@/components/UI/LoadingIcon'

export default function Settings(props: any) {
	useUserRedirect()

	const {
		user,
		state: { isLoading }
	} = useAppContext().Auth

	if (isLoading) {
		return <LoadingIcon />
	}

	return (
		<>
			<Head title={`Fuely | Settings - ${user.displayName}`} description={`${user.displayName} settings page`} />
			Settings
		</>
	)
}
