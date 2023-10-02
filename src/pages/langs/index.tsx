import { API_URL } from '@/lib/constants'
import { LangsPageBuilder } from '@/screens/Langs/LangsPageBuilder'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

const LangsPage = ({ handbooks }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Языки программирования</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<LangsPageBuilder handbooks={handbooks} />
		</>

	)
}
export interface iHandbookPageInfo{
	title: string
	handbook: iHandbook[]
}
export interface iHandbook {
	id: number;
	title: string;
	description: string;
	logo_url: string;
	status: iStatus;
}

interface iStatus{
	title: string;
	color_text: string;
	color_background: string;
}

export const getServerSideProps: GetServerSideProps<{
	handbooks: iHandbookPageInfo[]
}> = async ({ res }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const response = await fetch(API_URL + '/handbook/all')
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
	const handbooks = await response.json()
	return { props: { handbooks } }
}

export default LangsPage