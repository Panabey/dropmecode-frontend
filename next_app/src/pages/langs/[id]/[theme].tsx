import { API_URL } from "@/lib/constants";
import { LangDocsThemePageBuilder } from "@/screens/LangDocsTheme/LangDocsThemePageBuilder";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { FC } from "react";
import getSlug from "speakingurl";

interface iProps {
  langDocs: iLangDocs
  title: string
}

const LangDocsPageInfo: FC<iProps> = ({ langDocs, title }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={langDocs.short_description} />
        <meta name="keywords" content="IT, программирование, справочники, технологии, ресурсы, информационные технологии, программисты, обучение, DROPMECODE" />
      </Head>
      <LangDocsThemePageBuilder langDocs={langDocs} />
    </>
  )
}

export interface iLangDocs {
  id: number;
  short_description: string;
  title: string;
  text: string;
  reading_time: number;
  create_date: string;
  update_date: string;
  subpart: number;
  content: {
    part: number
    handbook: {
      id: number
      title: string
    }
  }
}

export const getServerSideProps: GetServerSideProps<{
  langDocs: iLangDocs, title: string
}> = async ({ res, resolvedUrl }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
  const url = resolvedUrl.split('/')
  if (url.length < 4) {
    return {
      props: {
        langDocs: null,
        title: ''
      },
      redirect: {
        destination: '/error',
        permanent: true,
      },
    }
  }
  const response = await fetch(API_URL + '/handbook?' + new URLSearchParams({ page_id: url[3].split('-')[0] }), {
    headers: {
      "X-Use-Cache": "true"
    }
  })
  const errorCode = response.ok ? false : response.status;
  if (errorCode) {
    res.statusCode = errorCode;
    return {
      props: {
        langDocs: null,
        title: ''
      },
      redirect: {
        destination: '/error',
        permanent: true,
      },
    }
  }
  const langDocs: iLangDocs = await response.json()
  const slug = '/langs/' + langDocs.content.handbook.title.toLowerCase() + `/${langDocs.id}-${getSlug(langDocs.title.toLowerCase(), { lang: 'ru' })}`
  if (resolvedUrl !== slug) {
    return {
      props: {
        langDocs: null,
        title: ''
      },
      redirect: {
        destination: slug,
        permanent: true,
      },
    }
  }
  return {
    props: {
      langDocs: langDocs,
      title: `${langDocs.content.handbook.title} ${'|'} ${langDocs.title}`
    }
  }
}

export default LangDocsPageInfo