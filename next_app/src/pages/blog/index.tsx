import { API_URL } from "@/lib/constants";
import { BlogsPageBuilder } from "@/screens/Blogs/BlogsPageBuilder";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

const BlogPage = ({ pageInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Блог проекта</title>
				<meta name="keywords" content="IT, программирование, разработка, обновления, блог, сайт, лог обновлений, веб-разработка, технологии, обновления сайта, DROPMECODE" />
				<meta name="description" content="В блоге DROPMECODE вы найдете последние обновления и статьи о разработке проекта. Узнаете о всех нововведениях в справочниках и квизах." />
			</Head>
			<BlogsPageBuilder pageInfo={pageInfo} />
		</>
	)
}

export interface iBlogsPageInfo {
	items: iBlogPreview[];
	current_page: number;
	total_page: number;
}

export interface iBlogPreview {
	id: number;
	title: string;
	reading_time: number;
	create_date: string;
}

export const getServerSideProps: GetServerSideProps<{
	pageInfo: iBlogsPageInfo
}> = async ({ res, query }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const BLOGS_PAGINATOR_PAGE = query.page_id !== undefined ? query.page_id : 1
	const BLOGS_LIMIT = 20
	const response = await fetch(API_URL + '/project/news/all?' + new URLSearchParams({ page: String(BLOGS_PAGINATOR_PAGE), limit: String(BLOGS_LIMIT) }))
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

export default BlogPage