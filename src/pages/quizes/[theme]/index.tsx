import { API_URL } from '@/lib/constants';
import { QuizesThemePageBuilder } from '@/screens/QuizesTheme/QuizesThemePageBuilder';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { iQuizesinfo } from '..';

const QuizesThemePage = ({ pageInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<QuizesThemePageBuilder pageInfo={pageInfo} />
	)
}

export const getServerSideProps: GetServerSideProps<{
	pageInfo: iQuizesinfo[]
}> = async ({ res, resolvedUrl }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const TOPIC_QUIZES_LIMIT = 20
	const url = resolvedUrl.split('/')

	if (url.length < 3) {
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
	const TOPIC_ID = url[2].split('-')[0];
	const response = await fetch(API_URL + '/quiz/topic?' + new URLSearchParams({ limit: String(TOPIC_QUIZES_LIMIT), topic_id: String(TOPIC_ID) }))
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


export default QuizesThemePage