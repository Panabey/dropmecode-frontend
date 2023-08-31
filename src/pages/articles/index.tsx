import { API_URL } from '@/lib/constants';
import { ArticlesListPageBuilder } from '@/screens/ArticlesList/ArticlesListPageBuilder';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const ArticlesPage = ({ pageInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<ArticlesListPageBuilder pageInfo={pageInfo} />
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