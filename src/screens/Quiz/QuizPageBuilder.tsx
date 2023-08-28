import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { UPLOADS_URL } from '@/lib/constants'
import { iQuizPagePreview } from '@/pages/quizes/[theme]/[quiz]'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import s from './QuizPageBuilder.module.css'
import { iAPIQuizQuestion, useGetQuestionAnswerMutation, useGetQuestionMutation } from './api/quiz.api'
import { QuizQuestion } from './components/QuizQuestion/QuizQuestion'
import { QuizQuestionLoader } from './components/QuizQuestionLoader/QuizQuestionLoader'
import { QuizRightSidebar } from './components/QuizRightSidebar/QuizRightSidebar'
import { getQuizResultInfo } from './utils/quizUtils'

interface iProps {
	pageInfo: iQuizPagePreview
}


export const QuizPageBuilder: FC<iProps> = ({ pageInfo }) => {

	const router = useRouter()

	const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);
	const [quizStatus, setQuizStatus] = useState<'preview' | 'running' | 'ended'>('preview');
	const [correctQuestionCounter, setCorrectQuestionCounter] = useState<number>(0);
	const [loadedQuestion, setLoadedQuestion] = useState<iAPIQuizQuestion | null>(null)

	const [fetchQuestion, { isLoading, data, error }] = useGetQuestionMutation()

	useEffect(() => {
		if (router.isReady && selectedQuestionIdx === 0 && quizStatus === 'running' && !data && !isLoading && !error) {
			fetchQuestion({ question_id: pageInfo.questions[selectedQuestionIdx], quiz_id: pageInfo.id })
		}
	}, [router, selectedQuestionIdx, quizStatus, data, error, isLoading])

	useEffect(() => {
		if (data && !isLoading && !error) {
			setLoadedQuestion(data)
		}
	}, [data, isLoading, error, setLoadedQuestion])

	const [fetchAnswer, { isLoading: isLoadingAnswer, data: dataAnswer, error: errorAnswer }] = useGetQuestionAnswerMutation()

	function onLoadAnswers() {
		fetchAnswer({ question_id: pageInfo.questions[selectedQuestionIdx], quiz_id: pageInfo.id })
	}

	useEffect(() => {
		if (dataAnswer && !isLoadingAnswer && !errorAnswer) {
			setLoadedQuestion(prev => {
				if (prev) {
					return { ...prev, answers: dataAnswer.answers }
				} else {
					return null
				}
			})
		}
	}, [dataAnswer, isLoadingAnswer, errorAnswer, setLoadedQuestion])

	function onClickNextQuestion(isCorrect: boolean) {
		setSelectedQuestionIdx((prev) => prev + 1)
		setLoadedQuestion(null)
		if (isCorrect) {
			setCorrectQuestionCounter((prev) => prev + 1)
		}
		if (selectedQuestionIdx < pageInfo.questions.length - 1) {
			fetchQuestion({ question_id: pageInfo.questions[selectedQuestionIdx + 1], quiz_id: pageInfo.id })
		} else {
			setQuizStatus('ended')
		}
	}

	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<PageCommonInfo
						title={quizStatus === 'preview' ? pageInfo.title : ''}
						description={quizStatus === 'preview' ? pageInfo.short_description : ''}
						breadcrumbs={[
							{ title: "Главная", navigationUrl: "/" },
							{ title: "Квизы", navigationUrl: "/quizes" },
							{ title: pageInfo.topic.title, navigationUrl: "/quizes/" + router.query.theme },
							{ title: pageInfo.title, navigationUrl: "/quizes/" + router.query.theme + "/" + router.query.quiz },
						]}
					/>
					<section className={s.quiz}>
						{quizStatus === 'running'
							&& <div className={s.quiz__info}>
								<span className={s.questions__counter}>Вопрос: {(selectedQuestionIdx + 1) < pageInfo.questions.length ? selectedQuestionIdx + 1 : pageInfo.questions.length} из {pageInfo.questions.length}</span>
								<div className={s.quiz__progress}>
									<span className={s.questions__counter}>Тест на {Math.round((selectedQuestionIdx) / pageInfo.questions.length * 100)}% пройден</span>
									<div className={s.progressbar}>
										<div className={s.progressbar__bg}></div>
										<div className={s.progressbar__active} style={{ width: `${Math.round((selectedQuestionIdx) / pageInfo.questions.length * 100)}%` }}></div>
									</div>
								</div>
							</div>
						}
						{
							quizStatus === 'preview'
								? <div className={s.preivew}>
									<img className={s.preview__img} src={UPLOADS_URL + pageInfo.logo_url} alt="Превью картинка квиза" />
									<span className={s.preview__counter}>Вопросов: {pageInfo.questions.length}</span>
									<button className={s.preview__button} onClick={() => setQuizStatus('running')}>Начать квиз</button>
								</div>
								: quizStatus === 'running'
									? (
										!loadedQuestion
											? <QuizQuestionLoader />
											: <QuizQuestion
												id={loadedQuestion.id}
												hint={loadedQuestion.hint}
												markdown={loadedQuestion.text}
												answers={loadedQuestion.answers}
												onClickNextQuestion={onClickNextQuestion}
												onLoadAnswers={onLoadAnswers}
											/>
									)
									: <div className={s.result}>
										<img className={s.result__icon} src={getQuizResultInfo(correctQuestionCounter, pageInfo.questions.length).imageUrl} />
										<h3 className={s.result__title}>{getQuizResultInfo(correctQuestionCounter, pageInfo.questions.length).title}</h3>
										<p className={s.result__description}>{getQuizResultInfo(correctQuestionCounter, pageInfo.questions.length).description}</p>
										<button className={s.result__button} onClick={() => router.push('/quizes')}>Другие квизы</button>
									</div>
						}
					</section>
				</Container>
			</div>
			<QuizRightSidebar quizStatus={quizStatus} quizTags={[{ title: "Квизы дня", navigationUrl: "/quizes/hot" }, { title: "Javascript", navigationUrl: "/quizes/js" }, { title: "Python", navigationUrl: "/quizes/python" }]} />
		</Layout>
	)
}
