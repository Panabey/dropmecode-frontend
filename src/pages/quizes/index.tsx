import { API_URL } from '@/lib/constants';
import { QuizesPageBuilder } from '@/screens/Quizes/QuizesPageBuilder';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const QuizesPage = ({ pageInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<QuizesPageBuilder pageInfo={pageInfo} />
	)
}

export interface iQuizesPageInfo {
	id: number;
	title: string;
	quizzes: iQuizesinfo[];
}

export interface iQuizesinfo {
	id: number;
	logo_url: string;
	title: string;
	short_description: string;
	tags?: string[] 
}

export const getServerSideProps: GetServerSideProps<{
	pageInfo: iQuizesPageInfo[]
}> = async ({ res }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const TOPICS_LIMIT = 5
	const TOPIC_QUIZES_LIMIT = 3
	const response = await fetch(API_URL + '/quiz/topic/all?' + new URLSearchParams({ limit: String(TOPICS_LIMIT), count_content: String(TOPIC_QUIZES_LIMIT) }))
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


export default QuizesPage