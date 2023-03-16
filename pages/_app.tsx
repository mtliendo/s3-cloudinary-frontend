import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'
import { ThemeProvider } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { config } from '@/src/config'
import Link from 'next/link'

Amplify.configure(config)

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<div className="navbar bg-primary text-primary-content">
				<Link href={'/'} className="btn btn-ghost normal-case text-xl">
					Home
				</Link>
			</div>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
