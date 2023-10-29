import { API_URL } from '@/lib/constants';
import { QuizesThemePageBuilder } from '@/screens/QuizesTheme/QuizesThemePageBuilder';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { iQuizesinfo } from '../index';

const QuizesThemePage = ({ pageInfo, title }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content="На DROPMECODE вы найдете интересные и образовательные онлайн тесты по программированию и информационным технологиям. Проверьте свои знания, решайте технические задачи и оцените свой уровень в IT сфере." />
				<meta name="keywords" content="IT квизы, Программирование, Тесты знаний, Онлайн экзамены, Оценка навыков, Квиз-тесты по программированию, Технические вопросы, Тестирование знаний IT, DROPMECODE квизы, Программирование викторины, Тесты для разработчиков, Задачи по программированию, Вопросы и ответы по IT, Интерактивные тесты, Обучение программированию" />
			</Head>
			<QuizesThemePageBuilder pageInfo={pageInfo} />
		</>
	)
}

export interface iQuizesThemePage {
	id: number;
	title: string;
	quizzes: iQuizesinfo[];
}

export const getServerSideProps: GetServerSideProps<{
	pageInfo: iQuizesThemePage, title: string
}> = async ({ res, resolvedUrl }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const TOPIC_QUIZES_LIMIT = 18
	const url = resolvedUrl.split('/')

	if (url.length < 3) {
		return {
			props: {
				pageInfo: null,
				title: ''
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
				pageInfo: {},
				title: ''
			},
			redirect: {
				destination: '/error',
				permanent: true,
			},
		}
	}
	const pageInfo = await response.json()
	return {
		props: {
			pageInfo: pageInfo,
			title: `DROPMECODE | ${pageInfo.title}`
		}
	}
}


export default QuizesThemePage