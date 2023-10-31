import { API_URL } from '@/lib/constants'
import { ArticlePageBuilder } from '@/screens/Article/ArticlePageBuilder'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import getSlug from 'speakingurl'

const NewsArticlePage = ({ article, title }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="keywords" content="IT, программирование, технологии, новости, разработка, информационные технологии, последние новости, статьи, новые статьи, статьи из мира IT, программирование новости, DROPMECODE" ></meta>
				<meta name="description" content={article.anons} />
			</Head>
			<ArticlePageBuilder article={article} />
		</>
	)
}

export interface iArticle {
	id: number;
	title: string;
	anons: string;
	text: string;
	tags: string[];
	reading_time: number;
	create_date: string;
	update_date: string;
}


export const getServerSideProps: GetServerSideProps<{
	article: iArticle, title: string
}> = async ({ res, resolvedUrl }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const url = resolvedUrl.split('/')
	if (url.length < 3) {
		return {
			props: {
				article: null,
				title: ''
			},
			redirect: {
				destination: '/error',
				permanent: true,
			},
		}
	}
	const ARTICLE_ID = url[2].split('-')[0]
	const response = await fetch(API_URL + '/article?' + new URLSearchParams({ article_id: String(ARTICLE_ID) }))
	const errorCode = response.ok ? false : response.status;
	if (errorCode) {
		res.statusCode = errorCode;
		return {
			props: {
				article: {},
				title: ''
			},
			redirect: {
				destination: '/error',
				permanent: true,
			},
		}
	}
	const article = await response.json()
	const slug = `/articles/${article.id}-${getSlug(article.title, { lang: 'ru' })}`
	if (resolvedUrl !== slug) {
		return {
			props: {
				article: null,
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
			article: article,
			title: `DROPMECODE | ${article.title}`
		}
	}
}

export default NewsArticlePage