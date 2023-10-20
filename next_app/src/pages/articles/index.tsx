import { API_URL } from '@/lib/constants';
import { ArticlesListPageBuilder } from '@/screens/ArticlesList/ArticlesListPageBuilder';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

const ArticlesPage = ({ pageInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Статьи</title>
				<meta name="keywords" content="IT, программирование, технологии, новости, разработка, информационные технологии, последние новости, статьи, новые статьи, статьи из мира IT, программирование новости, DROPMECODE" ></meta>
				<meta name="description" content="На DROPMECODE вы найдете свежие и интересные материалы о последних технологических трендах, программировании и IT-новостях. Узнавайте о новых языках программирования, фреймворках и инновационных решениях в мире информационных технологий." />
			</Head>
			<ArticlesListPageBuilder pageInfo={pageInfo} />
		</>
	)
}

export interface iArticlePageInfo {
	items: iArticlePreviewItem[];
	current_page: number;
	total_page: number;
}

export interface iArticlePreviewItem {
	id: number;
	logo_url: string;
	title: string;
	anons: string;
	tags: any[];
	reading_time: number;
	create_date: string;
}

export const getServerSideProps: GetServerSideProps<{
	pageInfo: iArticlePageInfo
}> = async ({ res }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const ARTICLE_PAGINATOR_PAGE = 1
	const ARTICLES_LIMIT = 20
	const response = await fetch(API_URL + '/article/all?' + new URLSearchParams({ page: String(ARTICLE_PAGINATOR_PAGE), limit: String(ARTICLES_LIMIT) }))
	const errorCode = response.ok ? false : response.status;
	if (errorCode) {
		res.statusCode = errorCode;
		return {
			props: {
				handbooks: []
			},
			redirect: {
				destination: '/error',
				permanent: true,
			},
		}
	}
	const pageInfo = await response.json()
	return { props: { pageInfo } }
}

export default ArticlesPage