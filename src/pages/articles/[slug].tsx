import { API_URL } from '@/lib/constants'
import { ArticlePageBuilder } from '@/screens/Article/ArticlePageBuilder'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const NewsArticlePage = ({ article }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<ArticlePageBuilder article={article} />
	)
}

export interface iArticle {
	id: number;
	title: string;
	anons: string;
	text: string;
	tags: iTag[];
	reading_time: number;
	create_date: string;
	update_date: string;
  }
  
  export interface iTag {
	id: number;
	title: string;
  }

export const getServerSideProps: GetServerSideProps<{
	article: iArticle
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
  	const ARTICLE_ID = url[2].split('-')[0]
	const response = await fetch(API_URL + '/article/?' + new URLSearchParams({ post_id: String(ARTICLE_ID) }))
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
	const article = await response.json()
	return { props: { article } }
}

export default NewsArticlePage