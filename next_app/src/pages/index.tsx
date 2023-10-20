import { HomePageBuilder } from '@/screens/Home/HomePageBuilder'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>DROPMECODE | Главная</title>
        <meta name="description" content="DROPMECODE - позвавательный портал для программистов и интересующихся IT миром. Множество бесплатных и полезных материалов для обучения и развлечений."></meta>
        <meta name="keywords" content="DROPMECODE, dropmecode, IT, программирование, портал для программистов, разработка, веб-разработка, базы данных, алгоритмы, структуры данных, компьютерные сети, 
        мобильные приложения, тестирование ПО, защита информации, python, javascript" />
      </Head>
      <HomePageBuilder />
    </>
  )
}
