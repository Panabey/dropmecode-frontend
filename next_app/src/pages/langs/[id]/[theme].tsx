import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import { API_URL, SITE_URL } from "@/lib/constants";
import { createLangDocsThemeJSONLD } from "@/lib/jsonld";
import { LangDocsThemePageBuilder } from "@/screens/LangDocsTheme/LangDocsThemePageBuilder";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { FC } from "react";
import getSlug from "speakingurl";

interface iProps {
  langDocs: iLangDocs
  title: string
  slug: string
}

const LangDocsPageInfo: FC<iProps> = ({ langDocs, title, slug }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const jsonLD = createLangDocsThemeJSONLD({
    title,
    url: SITE_URL + slug,
    author: 'Dropmecode',
    genre: 'Справочная информация',
    keywords: 'IT, программирование, справочники, технологии, ресурсы, информационные технологии, программисты, обучение, DROPMECODE',
    description: langDocs.short_description,
    dateModified: new Date(langDocs.update_date),
    datePublished: new Date(langDocs.create_date),
  })

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={langDocs.short_description} />
        <meta name="keywords" content="IT, программирование, справочники, технологии, ресурсы, информационные технологии, программисты, обучение, DROPMECODE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLD }}
        />
      </Head>
      <LangDocsThemePageBuilder langDocs={langDocs} />
      <ScrollToTopButton />
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
      slug: string
    }
  }
}

export const getServerSideProps: GetServerSideProps<{
  langDocs: iLangDocs, title: string, slug: string,
}> = async ({ res, resolvedUrl }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
  const url = resolvedUrl.split('/')
  if (url.length < 4) {
    return {
      props: {
        langDocs: null,
        title: '',
        slug: '',
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
        title: '',
        slug: '',
      },
      redirect: {
        destination: '/error',
        permanent: true,
      },
    }
  }
  const langDocs: iLangDocs = await response.json()
  const slug = '/langs/' + langDocs.content.handbook.slug + `/${langDocs.id}-${getSlug(langDocs.title.toLowerCase(), { lang: 'ru' })}`
  if (resolvedUrl !== slug) {
    return {
      props: {
        langDocs: null,
        title: '',
        slug: '',
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
      title: `${langDocs.content.handbook.title} ${'|'} ${langDocs.title}`,
      slug: slug,
    }
  }
}

export default LangDocsPageInfo