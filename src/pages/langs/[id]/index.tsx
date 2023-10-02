import { API_URL } from "@/lib/constants"
import { LangDocsPageBuilder } from "@/screens/LangDocs/LangDocsPageBuilder"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

const LangDocsPage = ({ langInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<LangDocsPageBuilder langInfo={langInfo} />
	)
}

export interface iLangInfo {
	id: number;
	title: string;
	description: string;
	content: iLangContent[];
}

export interface iLangContent {
	title: string;
	description: string;
	page: iLangPage[];
	part: number;
}

export interface iLangPage {
	id: number;
	title: string;
	subpart: string;
}

export const getServerSideProps: GetServerSideProps<{
	langInfo: iLangInfo
}> = async ({ res, resolvedUrl }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const url = resolvedUrl.split('/')
	if (url.length < 3) {
		return {
			props: {
				langInfo: null
			},
			redirect: {
				destination: '/error',
				permanent: true,
			},
		}
	}
	const response = await fetch(API_URL + '/handbook/content?' + new URLSearchParams({ handbook: url[2] }))
	const errorCode = response.ok ? false : response.status;
	if (errorCode) {
		res.statusCode = errorCode;
		return {
			props: {
				langInfo: null
			},
			redirect: {
				destination: '/error',
				permanent: true,
			},
		}
	}
	const langInfo = await response.json()
	return { props: { langInfo } }
}


export default LangDocsPage