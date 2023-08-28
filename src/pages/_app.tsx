import { setupStore } from '@/redux/store'
import '@/styles/codehighlight.css'
import '@/styles/githubmd.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'

const store = setupStore()

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>DROPMECODE</title>
    </Head>
    <Provider store={store}>
      <NextNProgress color="#1DC989" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      <Component {...pageProps} />
    </Provider>

  </>
}
