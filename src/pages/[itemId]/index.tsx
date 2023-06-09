import { useRouter } from 'next/router'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import Head from '@/components/Head'
import LoadingIcon from '@/components/UI/LoadingIcon'

export default function Item() {
	useUserRedirect()

	const router = useRouter()

	const { itemId } = router.query

	const {
		state: { isLoading }
	} = useAppContext().Auth

	if (isLoading) {
		return <LoadingIcon />
	}
	return (
		<>
			<Head title={`Fuely | ${itemId}`} description={`Fuely ${itemId} page`} />
			Item - {itemId}
		</>
	)
}
