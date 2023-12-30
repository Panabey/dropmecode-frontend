import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton'
import { API_URL, SITE_URL } from '@/lib/constants'
import { createArticleJSONLD } from '@/lib/jsonld'
import { ArticlePageBuilder } from '@/screens/Article/ArticlePageBuilder'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import getSlug from 'speakingurl'

const NewsArticlePage = ({ article, title, slug }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

	const jsonLD = createArticleJSONLD({
		title,
		url: SITE_URL + slug,
		author: 'Dropmecode',
		genre: 'Статья',
		keywords: 'IT, программирование, технологии, новости, разработка, информационные технологии, последние новости, статьи, новые статьи, статьи из мира IT, программирование новости, DROPMECODE',
		description: article.anons,
		dateModified: new Date(article.update_date),
		datePublished: new Date(article.create_date),
	})

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="keywords" content="IT, программирование, технологии, новости, разработка, информационные технологии, последние новости, статьи, новые статьи, статьи из мира IT, программирование новости, DROPMECODE" ></meta>
				<meta name="description" content={article.anons} />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: jsonLD }}
				/>
			</Head>
			<ArticlePageBuilder article={article} />
			<ScrollToTopButton />
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
	article: iArticle, title: string, slug: string
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
				title: '',
				slug: '',
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
			article: article,
			title: `${article.title}`,
			slug: slug,
		}
	}
}

export default NewsArticlePage