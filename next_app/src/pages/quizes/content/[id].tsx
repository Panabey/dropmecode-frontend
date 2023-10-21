import { API_URL } from "@/lib/constants"
import { QuizPageBuilder } from "@/screens/Quiz/QuizPageBuilder"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"

const QuizPage = ({ pageInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Head>
				<title>{`DROPMECODE | ${pageInfo.title}`}</title>
				<meta name="description" content={pageInfo.short_description} />
				<meta name="keywords" content="IT квизы, Программирование, Тесты знаний, Онлайн экзамены, Оценка навыков, Квиз-тесты по программированию, Технические вопросы, Тестирование знаний IT, DROPMECODE квизы, Программирование викторины, Тесты для разработчиков, Задачи по программированию, Вопросы и ответы по IT, Интерактивные тесты, Обучение программированию" />
			</Head>
			<QuizPageBuilder pageInfo={pageInfo} />
		</>
	)
}


export interface iQuizPagePreview {
	id: number;
	logo_url: string;
	title: string;
	meta: string;
	questions: number[];
	short_description: string;
	topic: {
		id: number;
		title: string;
	} | null
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