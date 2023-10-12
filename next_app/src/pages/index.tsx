import { HomePageBuilder } from '@/screens/Home/HomePageBuilder'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>DROPMECODE | Главная</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HomePageBuilder />
    </>
  )
}
