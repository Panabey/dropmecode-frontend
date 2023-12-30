import { API_URL, SITE_URL } from "@/lib/constants"
import { createQuizJSONLD } from "@/lib/jsonld"
import { QuizPageBuilder } from "@/screens/Quiz/QuizPageBuilder"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import getSlug from "speakingurl"

const QuizPage = ({ pageInfo, title, slug }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

	const jsonLD = createQuizJSONLD({
		name: title,
		url: SITE_URL + slug,
		genre: 'Квиз-тест',
		keywords: 'IT квизы, Программирование, Тесты знаний, Онлайн экзамены, Оценка навыков, Квиз-тесты по программированию, Технические вопросы, Тестирование знаний IT, DROPMECODE квизы, Программирование викторины, Тесты для разработчиков, Задачи по программированию, Вопросы и ответы по IT, Интерактивные тесты, Обучение программированию',
		description: pageInfo.short_description,
	})

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={pageInfo.short_description} />
				<meta name="keywords" content="IT квизы, Программирование, Тесты знаний, Онлайн экзамены, Оценка навыков, Квиз-тесты по программированию, Технические вопросы, Тестирование знаний IT, DROPMECODE квизы, Программирование викторины, Тесты для разработчиков, Задачи по программированию, Вопросы и ответы по IT, Интерактивные тесты, Обучение программированию" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: jsonLD }}
				/>
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
	description: string;
	topic: {
		id: number;
		title: string;
	} | null
}

export const getServerSideProps: GetServerSideProps<{
	pageInfo: iQuizPagePreview, title: string, slug: string
}> = async ({ res, resolvedUrl }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59')
	const url = resolvedUrl.split('/')
	if (url.length < 4) {
		return {
			props: {
				pageInfo: null,
				title: '',
				slug: '',
			},
			redirect: {
				destination: '/error',
				permanent: true,
			},
		}
	}
	const response = await fetch(API_URL + '/quiz?' + new URLSearchParams({ quiz_id: String(url[3].split('-')[0]) }))
	const errorCode = response.ok ? false : response.status;
	if (errorCode) {
		res.statusCode = errorCode;
		return {
			props: {
				pageInfo: [],
				title: '',
				slug: '',
			},
			redirect: {
				destination: '/error',
				permanent: true,
			},
		}
	}
	const pageInfo = await response.json()
	const slug = `/quizes/content/${pageInfo.id}-${getSlug(pageInfo.title, { lang: 'ru' })}`
	if (resolvedUrl !== slug) {
		return {
			props: {
				pageInfo: null,
				title: '',
				slug: '',
			},
			redirect: {
				destination: slug,
				permanent: true,
			},
		}
	}
	return {
		props: {
			pageInfo: pageInfo,
			title: `DROPMECODE | ${pageInfo.title}`,
			slug: slug,
		}
	}
}

export default QuizPage