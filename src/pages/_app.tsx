import type { AppProps } from 'next/app'
import AppContextWrapper from '@/utils/AppContextWrapper'

import Layout from '@/components/Layout/Layout'

import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AppContextWrapper>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AppContextWrapper>
	)
}
