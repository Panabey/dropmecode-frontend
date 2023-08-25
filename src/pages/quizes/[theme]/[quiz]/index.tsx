import { API_URL } from "@/lib/constants"
import { QuizPageBuilder } from "@/screens/Quiz/QuizPageBuilder"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

const QuizPage = ({ pageInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	console.log(pageInfo)
	return (
		<QuizPageBuilder questions={[]} pageInfo={pageInfo} />
	)
}


export interface iQuizPagePreview {
	id: number;
	logo_url: string;
	title: string;
	meta: string;
	questions: iQuizQuestionPreview[];
}

export interface iQuizQuestionPreview {
	id: number;
}

export const getServerSideProps: GetServerSideProps<{
	pageInfo: iQuizPagePreview
}> = async ({ res, resolvedUrl }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const url = resolvedUrl.split('/')
	if (url.length < 4) {
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
	const response = await fetch(API_URL + '/quiz/?' + new URLSearchParams({ quiz_id: String(url[3].split('-')[0]) }))
	const errorCode = response.ok ? false : response.status;
	if (errorCode) {
		res.statusCode = errorCode;
		return {
			props: {
				pageInfo: []
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

export default QuizPage