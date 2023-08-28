import classNames from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import { IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { PiLightbulbFilament } from 'react-icons/pi'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import s from './QuizQuestion.module.css'
import { iQuizQuestionAnswer, isCorrectAnswer, isCorrectSkippedAnswer, isLossAnswer } from '../../utils/quizUtils'

export interface iQuizQuestion {
	id: number
	title?: string
	hint: string
	markdown?: string
	answers: iQuizQuestionAnswer[]
}

interface iProps extends iQuizQuestion {
	onClickNextQuestion: (isCorrect: boolean) => void
	onLoadAnswers: () => void
}

export const QuizQuestion: FC<iProps> = ({ hint, answers, markdown, onClickNextQuestion, onLoadAnswers }) => {
	const [isOpenedHint, setIsOpenedHint] = useState<boolean>(false);
	const [answerStatus, setAnswerStatus] = useState<'waiting' | 'answered'>('waiting');
	const [selectedAnswers, setSelectedAnswers] = useState<iQuizQuestionAnswer[]>([]);

	function onSelectAnswer(answer: iQuizQuestionAnswer) {
		setSelectedAnswers((prev) => prev.find((prevAnswer) => prevAnswer.id === answer.id) ? prev.filter((prevAnswer) => prevAnswer.id !== answer.id) : [...prev, answer])
	}

	function onClickNext() {
		let isCorrect = true;
		const correctAnswersIds = answers.filter((answer) => typeof answer === 'object' && answer.hasOwnProperty('is_correct') && answer.is_correct === true).map((answer) => answer.id).sort((a, b) => a - b)
		const selectedAnswersIds = selectedAnswers.map((answer) => answer.id).sort((a, b) => a - b)
		if (selectedAnswersIds.length !== correctAnswersIds.length) {
			isCorrect = false;
		}
		for (let i = 0; i < correctAnswersIds.length; i++) {
			if (correctAnswersIds[i] !== selectedAnswersIds[i]) {
				isCorrect = false;
				break;
			}
		}
		onClickNextQuestion(isCorrect);
		setAnswerStatus('waiting');
		setSelectedAnswers([]);
	}

	function onClickConfirmQuestion() {
		setAnswerStatus('answered')
		onLoadAnswers()
	}

	const hintRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		function onClickDocument(event: MouseEvent) {
			//@ts-ignore
			if ((event.target === hintRef.current)) {
				return
			}
			setIsOpenedHint(false)
		}
		document.addEventListener('click', onClickDocument, false)

		return () => {
			document.removeEventListener('click', onClickDocument)
		}
	}, [])

	return (
		<div className={s.question}>
			{/* <h2 className={s.title}>{title}</h2> */}
			{markdown && markdown.length
				&& <ReactMarkdown
					className={classNames(s.markdown, 'markdown-body')}
				>
					{markdown}
				</ReactMarkdown>
			}
			<div className={s.answers}>
				<aside className={s.answers__title}>Выберите правильный(е) ответ(ы): </aside>
				{answers.map((answer) => {
					return (
						<div key={answer.id} onClick={() => onSelectAnswer(answer)} className={classNames(
							s.answer,
							{ [s.answer_noevents]: answerStatus === 'answered' },
							{ [s.answer_selected]: selectedAnswers.find((selectedAnswer) => selectedAnswer.id === answer.id) },
							{ [s.answer_correct]: answerStatus === 'answered' && isCorrectAnswer(selectedAnswers, answer) },
							{ [s.answer_loss]: answerStatus === 'answered' && isLossAnswer(selectedAnswers, answer) },
							{ [s.answer_correct_skip]: answerStatus === 'answered' && isCorrectSkippedAnswer(selectedAnswers, answer) },
						)}>
							<span className={s.answer__title}>
								{
									selectedAnswers.find((selectedAnswer) => selectedAnswer.id === answer.id)
										? <IoIosCheckmarkCircle size={24} fill="#1F477D" />
										: <IoIosCheckmarkCircleOutline size={24} fill="#1F477D" />
								} {answer.text}
							</span>
							{
								(answerStatus === 'answered' && (answers.length && answers[0].hasOwnProperty('is_correct')))
								&& ((answerStatus === 'answered' && selectedAnswers.find((selectedAnswer) => selectedAnswer.id === answer.id))
									|| (answerStatus === 'answered' && isCorrectSkippedAnswer(selectedAnswers, answer)))
								&& <aside className={s.answer__explanation}>
									{answer.explanation}
								</aside>
							}
						</div>
					)
				})}
				<div className={s.buttons}>
					{answerStatus === 'waiting'
						? <div className={s.hint__area}>
							<div ref={hintRef} className={classNames(s.button_hint, { [s.button_hint_active]: isOpenedHint })} onClick={() => setIsOpenedHint((prev) => !prev)}>
								<PiLightbulbFilament fill="#000" size={18} />
								Подсказка
							</div>
							{isOpenedHint && <div className={s.hint}>{hint}</div>}
						</div>
						: <span> </span>}
					{
						answerStatus === 'waiting' || (answers.length && !answers[0].hasOwnProperty('is_correct'))
							? <button
								disabled={!Boolean(selectedAnswers.length) || (answerStatus === 'answered' && (answers.length && !answers[0].hasOwnProperty('is_correct')) ? true : false)}
								className={classNames(s.answers__button, s.answers__button_confirm)}
								onClick={onClickConfirmQuestion}
							>
								{answerStatus === 'waiting' ? 'Подтвердить' : 'Подтверджаем...'}
							</button>
							: <></>
					}
					{
						answerStatus === 'answered' && (answers.length && answers[0].hasOwnProperty('is_correct'))
							? <button
								className={classNames(s.answers__button, s.answers__button_next)}
								onClick={onClickNext}
							>
								Дальше
							</button>
							: <></>
					}
				</div>
			</div>
		</div>
	)
}
