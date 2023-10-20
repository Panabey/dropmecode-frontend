import { API_URL } from '@/lib/constants';
import { QuizesPageBuilder } from '@/screens/Quizes/QuizesPageBuilder';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

const QuizesPage = ({ pageInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Квизы</title>
				<meta name="description" content="На DROPMECODE вы найдете интересные и образовательные онлайн тесты по программированию и информационным технологиям. Проверьте свои знания, решайте технические задачи и оцените свой уровень в IT сфере." />
				<meta name="keywords" content="IT квизы, Программирование, Тесты знаний, Онлайн экзамены, Оценка навыков, Квиз-тесты по программированию, Технические вопросы, Тестирование знаний IT, DROPMECODE квизы, Программирование викторины, Тесты для разработчиков, Задачи по программированию, Вопросы и ответы по IT, Интерактивные тесты, Обучение программированию" />
			</Head>
			<QuizesPageBuilder pageInfo={pageInfo} />
		</>
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