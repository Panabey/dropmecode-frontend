import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { iQuizesPageInfo } from '@/pages/quizes'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'
import getSlug from 'speakingurl'
import s from './QuizesPageBuilder.module.css'
import { useGetTopicsMutation } from './api/quizes.api'
import { QuizPreview } from './components/QuizPreview/QuizPreview'
import { QuizesTopicLoader } from './components/QuizesTopicLoader/QuizesTopicLoader'

interface iProps {
	pageInfo: iQuizesPageInfo[]
}

const TOPICS_LIMIT = 5
const COUNT_QUIZES = 3

export const QuizesPageBuilder: FC<iProps> = ({ pageInfo }) => {

	const [topics, setTopics] = useState<iQuizesPageInfo[]>(pageInfo);

	const entryRef = useRef<null | HTMLElement>(null)
	const { reObserve } = useIntersectionObserver(entryRef, onIntersected)
	const [fetchTopics, { isLoading, data, error }] = useGetTopicsMutation()

	function onIntersected() {
		fetchTopics({ limit: TOPICS_LIMIT, continue_after: topics.length, count_content: COUNT_QUIZES })
	}

	useEffect(() => {
		if (!isLoading && data && data.length) {
			setTopics((prev) => [...prev, ...data]);
		}
	}, [isLoading, data, setTopics])

	if (error) {
		console.error(error)
		throw new Error("Ошибка при дозагрузке топиков через IntersectionObserverAPI на странице списка топиков квизов")
	}

	useEffect(() => {
		if (topics.length > 0) {
			entryRef.current = document.querySelector(`[data-topic-id="${topics[topics.length - 1].id}"]`);
			reObserve(entryRef.current)
		}
	}, [topics]);

	return (
		<PageLayout className={s.layout}>
			<PageArea className={s.area}>
				<div></div>
				<Container className={s.container}>
					<PageCommonInfo
						title='Квизы'
						description='Занимательные и развлекательные квиз-тесты для закрепления полученных знаний в области IT и не только!'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Квизы", navigationUrl: "/quizes" }]}
					/>
					<Link href="/quizes/all" className={s.button__quizes_all}>Посмотреть все квизы</Link>
					<div className={s.topics}>
						{topics.map((info, idx) => {
							return (
								<section className={s.section} key={info.id} ref={idx + 1 === pageInfo.length ? entryRef : null} data-topic-id={info.id}>
									<div className={s.section__row}>
										<h3 className={s.section__title}>{info.title}</h3>
										<Link className={s.section__details} href={`/quizes/${info.id}-${getSlug(info.title, { lang: 'ru' })}`}>Показать все</Link>
									</div>
									<div className={s.quizes}>
										{info.quizzes.map((quiz) => {
											return (
												<QuizPreview
													key={quiz.id}
													id={quiz.id}
													logo_url={quiz.logo_url}
													short_description={quiz.short_description}
													title={quiz.title}
													slug={`/quizes/content/${quiz.id}-${getSlug(quiz.title, { lang: 'ru' })}`}
												/>
											)
										})}
									</div>
								</section>
							)
						})}
						{
							isLoading
								? <>
									<QuizesTopicLoader />
									<QuizesTopicLoader />
									<QuizesTopicLoader />
								</>
								: <></>
						}
					</div>
				</Container>
				<div></div>
			</PageArea>
		</PageLayout>
	)
}
