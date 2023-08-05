import useAppContext from '@/hooks/Other/use-app-context'

import Head from '@/components/Head'

export default function Home() {
	const { getText } = useAppContext().Language
	return (
		<>
			<Head title={`Fuely | ${getText('Homepage')}`} description="Fuely home page" />
			<></>
		</>
	)
}
