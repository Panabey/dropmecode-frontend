import { API_URL } from "@/lib/constants"
import { LangDocsPageBuilder } from "@/screens/LangDocs/LangDocsPageBuilder"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"

const LangDocsPage = ({ langInfo, title }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={langInfo.description} />
				<meta name="keywords" content="IT, программирование, справочники, технологии, ресурсы, информационные технологии, программисты, обучение, DROPMECODE" />
			</Head>
			<LangDocsPageBuilder langInfo={langInfo} />
		</>
	)
}

export interface iLangInfo {
	id: number;
	title: string;
	description: string;
	content: iLangContent[];
	books: iBook[]
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

export interface iBook {
	logo_url: string
	title: string
	author: string
}

export const getServerSideProps: GetServerSideProps<{
	langInfo: iLangInfo, title: string
}> = async ({ res, resolvedUrl }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const url = resolvedUrl.split('/')
	if (url.length < 3) {
		return {
			props: {
				langInfo: null,
				title: ''
			},
			redirect: {
				destination: '/error',
				permanent: true,
			},
		}
	}
	const response = await fetch(API_URL + '/handbook/content?' + new URLSearchParams({ handbook: url[2] }), {
		headers: {
			"X-Use-Cache": "true"
		}
	})
	const errorCode = response.ok ? false : response.status;
	if (errorCode) {
		res.statusCode = errorCode;
		return {
			props: {
				langInfo: null,
				title: ''
			},
			redirect: {
				destination: '/error',
				permanent: true,
			},
		}
	}
	const langInfo = await response.json()
	return {
		props: {
			langInfo: langInfo,
			title: `DROPMECODE | ${langInfo.title}`
		}
	}
}


export default LangDocsPage