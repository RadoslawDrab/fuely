import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import LoadingIcon from '@/components/UI/LoadingIcon'

export default function Settings(props: any) {
	const {
		state: { isLoading }
	} = useAppContext().Auth

	useUserRedirect()

	if (isLoading) {
		return <LoadingIcon />
	}

	return <>Settings</>
}
