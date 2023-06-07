import { useRouter } from 'next/router'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import LoadingIcon from '@/components/UI/LoadingIcon'

export default function Item(props: any) {
	const router = useRouter()

	const {
		state: { isLoading }
	} = useAppContext().Auth

	useUserRedirect()

	if (isLoading) {
		return <LoadingIcon />
	}
	return <>Item - {router.query.itemId} </>
}
