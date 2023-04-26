import type { AppProps } from 'next/app'
import AppContextWrapper from '@/utils/AppContextWrapper'
import '@styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AppContextWrapper>
			<Component {...pageProps} />
		</AppContextWrapper>
	)
}
