import { HomePageBuilder } from '@/screens/Home/HomePageBuilder'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>DROPMECODE | Главная</title>
      </Head>
      <HomePageBuilder />
    </>
  )
}
