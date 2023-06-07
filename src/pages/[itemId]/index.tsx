import Head from 'next/head'
import { useRouter } from 'next/router'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import LoadingIcon from '@/components/UI/LoadingIcon'

export default function Item() {
	const router = useRouter()

	const { itemId } = router.query

	const {
		state: { isLoading }
	} = useAppContext().Auth

	useUserRedirect()

	if (isLoading) {
		return <LoadingIcon />
	}
	return (
		<>
			<Head>
				<title>Fuely | {itemId}</title>
				<meta name="description" content={`Fuely ${itemId} page`} />
			</Head>
			Item - {itemId}
		</>
	)
}
