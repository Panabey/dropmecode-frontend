import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton';
import { API_URL } from '@/lib/constants';
import { BlogPageBuilder } from '@/screens/Blog/BlogPageBuilder';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import getSlug from 'speakingurl';

const BlogPage = ({ blog }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>DROPMECODE | Статья блога</title>
        <meta name="keywords" content="IT, программирование, разработка, обновления, блог, сайт, лог обновлений, веб-разработка, технологии, обновления сайта, DROPMECODE" />
        <meta name="description" content="В блоге DROPMECODE вы найдете последние обновления и статьи о разработке проекта. Узнаете о всех нововведениях в справочниках и квизах." />
        <meta name="robots" content="noindex" />
      </Head>
      <BlogPageBuilder blog={blog} />
      <ScrollToTopButton />
    </>
  )
}

export interface iBlog {
  id: number;
  title: string;
  text: string;
  reading_time: number;
  create_date: string;
}


export const getServerSideProps: GetServerSideProps<{
  blog: iBlog
}> = async ({ res, resolvedUrl }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
  const url = resolvedUrl.split('/')
  if (url.length < 3) {
    return {
      props: {
        blog: null
      },
      redirect: {
        destination: '/error',
        permanent: true,
      },
    }
  }
  const NEWS_ID = url[2].split('-')[0]
  const response = await fetch(API_URL + '/project/news/?' + new URLSearchParams({ news_id: String(NEWS_ID) }))
  const errorCode = response.ok ? false : response.status;
  if (errorCode) {
    res.statusCode = errorCode;
    return {
      props: {
        blog: {}
      },
      redirect: {
        destination: '/error',
        permanent: true,
      },
    }
  }
  const blog = await response.json()
  const slug = `/blog/${blog.id}-${getSlug(blog.title, { lang: 'ru' })}`
  if (resolvedUrl !== slug) {
    return {
      props: {
        blog: null,
        title: ''
      },
      redirect: {
        destination: slug,
        permanent: true,
      },
    }
  }
  return { props: { blog } }
}

export default BlogPage