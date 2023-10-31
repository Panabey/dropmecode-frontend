import classNames from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import getSlug from 'speakingurl'
import { useGetQuizesFromTopicQuery, useGetTopicsQuery } from '../../api/quiz.api'
import { QuizRightSidebarLoader } from '../QuizRightSidebarLoader/QuizRightSidebarLoader'
import s from './QuizRightSidebar.module.css'

export interface iQuizTag {
	title: string
	navigationUrl: string
}

interface iProps {
	quizStatus: 'preview' | 'running' | 'ended'
	topicId: number | null
	quizId: number
}

export const QuizRightSidebar: FC<iProps> = ({ quizStatus, topicId, quizId }) => {

	const { isLoading: isLoadingTopics, data: dataTopics, error: errorTopics } = useGetTopicsQuery({ limit: 5, count_content: 1 })
	const { isLoading: isLoadingQuizesTopic, data: dataQuizesTopic, error: errorQuizesTopic } = useGetQuizesFromTopicQuery({ limit: 5, topic_id: topicId })

	if (errorTopics) {
		console.error(errorTopics)
		throw new Error('Ошибка при загрузке списка топиков на странице превью квиза')
	}

	if (errorQuizesTopic) {
		console.error(errorQuizesTopic)
		throw new Error('Ошибка при загрузке списка квизов из конкретного топика на странице превью квиза')
	}

	return (
		<div className={s.sidebar}>
			<div className={"filler"}></div>
			<div className={s.blocks}>
				{
					quizStatus !== 'running' && (isLoadingTopics || dataTopics?.filter((item) => item.id !== topicId).length)
						? <div className={s.block}>
							<h4 className={s.block__title}>Другие категории квизов</h4>
							<div className={s.block__column}>
								{isLoadingTopics
									? new Array(5).fill(null).map((_, idx) => {
										return (
											<QuizRightSidebarLoader key={idx} />
										)
									})
									: dataTopics && dataTopics.filter((item) => item.id !== topicId).length
										? dataTopics.filter((item) => item.id !== topicId).map((link) => {
											return (
												<Link href={`/quizes/${link.id}-${getSlug(link.title, { lang: 'ru' })}`} className={s.block__link} key={link.id}>{link.title}</Link>
											)
										})
										: <div className={s.quizes__empty}>Мы не смогли ничего найти :{'('}</div>
								}
							</div>
						</div>
						: <></>
				}
				{
					quizStatus !== 'running' && (isLoadingQuizesTopic || dataQuizesTopic?.quizzes.filter((item) => item.id !== topicId).length)
						? <div className={classNames(s.block, s.block_marginTop)}>
							<h4 className={s.block__title}>Квизы в этой категории</h4>
							<div className={s.block__column}>
								{isLoadingQuizesTopic
									? new Array(5).fill(null).map((_, idx) => {
										return (
											<QuizRightSidebarLoader key={idx} />
										)
									})
									: dataQuizesTopic && dataQuizesTopic.quizzes.filter((quiz) => quiz.id !== quizId).length
										? dataQuizesTopic.quizzes.filter((quiz) => quiz.id !== quizId).map((quiz) => {
											return (
												<Link href={`/quizes/content/${quiz.id}-${getSlug(quiz.title, { lang: 'ru' })}`} className={s.block__link} key={quiz.id}>{quiz.title}</Link>
											)
										})
										: <div className={s.quizes__empty}>Мы не смогли ничего найти :{'('}</div>
								}
							</div>
						</div>
						: <></>
				}
				{
					quizStatus === 'running'
					&& <div className={classNames(s.block)}>
						<h4 className={s.block__title}>Варианты ответов</h4>
						<div className={s.block__column}>
							<div className={s.block__line}>
								<span>Не выбран</span>
								<hr className={classNames(s.block__underline, s.block__underline_unselected)} />
							</div>
							<div className={s.block__line}>
								<span>Выбран</span>
								<hr className={classNames(s.block__underline, s.block__underline_selected)} />
							</div>
							<div className={s.block__line}>
								<span>Правильный</span>
								<hr className={classNames(s.block__underline, s.block__underline_correct)} />
							</div>
							<div className={s.block__line}>
								<span>Неправильный</span>
								<hr className={classNames(s.block__underline, s.block__underline_loss)} />
							</div>
							<div className={s.block__line}>
								<span>Правильный, но не выбран</span>
								<hr className={classNames(s.block__underline, s.block__underline_correct_skip)} />
							</div>
						</div>
					</div>
				}
			</div>
		</div>
	)
}
