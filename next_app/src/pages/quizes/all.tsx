import { API_URL } from '@/lib/constants';
import { AllQuizesPageBuilder } from '@/screens/Quizes/AllQuizes/AllQuizesPageBuilder';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { iQuizesinfo } from './index';

export interface iAllQuizesPageInfo {
	id: number | null;
	title: string | null;
	quizzes: iQuizesinfo[];
}


const AllQuizesPage = ({ pageInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Все квизы</title>
				<meta name="description" content="На DROPMECODE вы найдете интересные и образовательные онлайн тесты по программированию и информационным технологиям. Проверьте свои знания, решайте технические задачи и оцените свой уровень в IT сфере." />
				<meta name="keywords" content="IT квизы, Программирование, Тесты знаний, Онлайн экзамены, Оценка навыков, Квиз-тесты по программированию, Технические вопросы, Тестирование знаний IT, DROPMECODE квизы, Программирование викторины, Тесты для разработчиков, Задачи по программированию, Вопросы и ответы по IT, Интерактивные тесты, Обучение программированию" />
			</Head>
			<AllQuizesPageBuilder pageInfo={pageInfo} />
		</>
	)
}

export const getServerSideProps: GetServerSideProps<{
	pageInfo: iAllQuizesPageInfo
}> = async ({ res }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const TOPICS_LIMIT = 18
	const response = await fetch(API_URL + '/quiz/topic?' + new URLSearchParams({ limit: String(TOPICS_LIMIT) }))
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

export default AllQuizesPage