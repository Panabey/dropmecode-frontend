import classNames from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import s from './QuizRightSidebar.module.css'

export interface iQuizTag {
	title: string
	navigationUrl: string
}

interface iProps {
	quizStatus: 'preview' | 'running' | 'ended'
	quizTags: iQuizTag[]
}

export const QuizRightSidebar: FC<iProps> = ({ quizStatus, quizTags }) => {
	return (
		<div className={s.sidebar}>
			<div className={s.filler}></div>
			<div className={s.blocks}>
				{
					quizStatus !== 'running'
					&& <div className={s.block}>
						<h4 className={s.block__title}>Другие категории квизов</h4>
						<div className={s.block__column}>
							{quizTags.map((link) => {
								return (
									<Link href={link.navigationUrl} className={s.block__link} key={link.navigationUrl}>{link.title}</Link>
								)
							})}
						</div>
					</div>
				}
				{
					quizStatus !== 'running'
					&& <div className={classNames(s.block, s.block_marginTop)}>
						<h4 className={s.block__title}>Квизы в этой категории</h4>
						<div className={s.block__column}>
							{quizTags.map((link) => {
								return (
									<Link href={link.navigationUrl} className={s.block__link} key={link.navigationUrl}>{link.title}</Link>
								)
							})}
						</div>
					</div>
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
