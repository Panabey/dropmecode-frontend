import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { iQuizesinfo } from '@/pages/quizes'
import { iQuizesThemePage } from '@/pages/quizes/[theme]'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import getSlug from 'speakingurl'
import { useGetAllQuizesMutation } from '../Quizes/api/quizes.api'
import { QuizPreview } from '../Quizes/components/QuizPreview/QuizPreview'
import { QuizPreviewLoader } from '../Quizes/components/QuizPreviewLoader/QuizPreviewLoader'
import s from './QuizesThemePageBuilder.module.css'

interface iProps {
	pageInfo: iQuizesThemePage
}

const QUIZES_LIMIT = 18

export const QuizesThemePageBuilder: FC<iProps> = ({ pageInfo }) => {

	const router = useRouter()

	const [quizes, setQuizes] = useState<iQuizesinfo[]>(pageInfo.quizzes);

	const entryRef = useRef<null | HTMLElement>(null)
	const { reObserve } = useIntersectionObserver(entryRef, onIntersected)
	const [fetchQuizes, { isLoading, data, error }] = useGetAllQuizesMutation()

	function onIntersected() {
		fetchQuizes({ limit: QUIZES_LIMIT, continue_after: quizes.length, topic_id: pageInfo.id })
	}

	useEffect(() => {
		if (!isLoading && data && data.quizzes.length) {
			setQuizes((prev) => [...prev, ...data.quizzes]);
		}
	}, [isLoading, data, setQuizes])

	if (error) {
		console.error(error)
		throw new Error("Ошибка при дозагрузке списка квизов через IntersectionObserverAPI на странице списка всех квизов")
	}

	useEffect(() => {
		if (quizes.length > 0) {
			entryRef.current = document.querySelector(`[data-quiz-id="${quizes[quizes.length - 1].id}"]`);
			reObserve(entryRef.current)
		}
	}, [quizes]);

	return (
		<PageLayout>
			<PageArea className={s.layout__area}>
				<div></div>
				<Container className={s.container}>
					<PageCommonInfo
						title={pageInfo.title}
						description={`Горячие и интересные квизы по теме "${pageInfo.title}", специально для вас. Пройдите их и оцените свои дедуктивные способности.`}
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Квизы", navigationUrl: "/quizes" }, { title: pageInfo.title, navigationUrl: `/quizes/${router.query.theme}` }]}
					/>
					<section className={s.section}>
						<div className={s.quizes}>
							{quizes.map((quiz, idx) => {
								return (
									<section key={quiz.id} ref={idx + 1 === quizes.length ? entryRef : null} data-quiz-id={quiz.id}>
										<QuizPreview
											{...quiz}
											slug={`/quizes/content/${quiz.id}-${getSlug(quiz.title, { lang: 'ru' })}`}
										/>
									</section>
								)
							})}
							{
								isLoading
									? <>
										<QuizPreviewLoader />
										<QuizPreviewLoader />
										<QuizPreviewLoader />
									</>
									: <></>
							}
						</div>
					</section>
				</Container>
				<div></div>
			</PageArea>
		</PageLayout>
	)
}
