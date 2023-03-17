import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'
import { ThemeProvider } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { config } from '@/src/config'

Amplify.configure(config)

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
