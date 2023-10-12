import { API_URL } from '@/lib/constants';
import { BlogPageBuilder } from '@/screens/Blog/BlogPageBuilder';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const BlogPage = ({ blog }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BlogPageBuilder blog={blog} />
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
        langDocs: null
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
        article: {}
      },
      redirect: {
        destination: '/error',
        permanent: true,
      },
    }
  }
  const blog = await response.json()
  return { props: { blog } }
}

export default BlogPage