import { API_URL } from "@/lib/constants";
import { BlogsPageBuilder } from "@/screens/Blogs/BlogsPageBuilder"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

const BlogPage = ({ pageInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<BlogsPageBuilder pageInfo={pageInfo}  />
	)
}

export interface iBlogsPageInfo{
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
}> = async ({ res }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const BLOGS_PAGINATOR_PAGE = 1
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