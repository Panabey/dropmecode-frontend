import { AcceptCookie } from '@/components/AcceptCookie/AcceptCookie'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import ImageViewer from '@/components/ImageViewer/ImageViewer'
import { YMetrica } from '@/components/YMetrica/YMetrica'
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
  return (
    <>
      <Head>
        <title>DROPMECODE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <NextNProgress color="#1DC989" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
        <AcceptCookie />
        <YMetrica />
        <ImageViewer />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Provider>
    </>
  )
}
