import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { FC, useState } from 'react'
import s from './QuizPageBuilder.module.css'
import { QuizQuestion, iQuizQuestion } from './QuizQuestion/QuizQuestion'

interface iProps {
	questions: iQuizQuestion[]
}

export const QuizPageBuilder: FC<iProps> = ({ questions }) => {
	const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);
	const [quizStatus, setQuizStatus] = useState<'preview' | 'running' | 'ended'>('preview');
	const [correctQuestionCounter, setCorrectQuestionCounter] = useState<number>(0);

	function onClickNextQuestion(isCorrect: boolean) {
		setSelectedQuestionIdx((prev) => prev + 1)
		if (isCorrect) {
			setCorrectQuestionCounter((prev) => prev + 1)
		}
		if (selectedQuestionIdx < questions.length - 1) {
		} else {
			setQuizStatus('ended')
		}
	}

	function getResultInfo() {
		let result = {
			title: "",
			description: "",
			imageUrl: ""
		}
		const resultPercent = Math.round((selectedQuestionIdx) / questions.length * 100)
		if (resultPercent <= 10) {
			result = {
				title: "Очень грустно",
				description: `Вы дали ${resultPercent}% правильных ответов. Изучите материал подробнее и вернитесь к тесту позже`,
				imageUrl: "/assets/Quizes/Results/0.svg"
			}
		} else if (resultPercent > 10 && resultPercent <= 25) {
			result = {
				title: "Грустно",
				description: `Вы дали ${resultPercent}% правильных ответов. Изучите материал подробнее и вернитесь к тесту позже`,
				imageUrl: "/assets/Quizes/Results/1.svg"
			}
		} else if (resultPercent > 25 && resultPercent <= 50) {
			result = {
				title: "Старайтесь лучше",
				description: `Вы дали ${resultPercent}% правильных ответов. Это не плохой, но и не лучший результат. Вы можете лучше`,
				imageUrl: "/assets/Quizes/Results/2.svg"
			}
		} else if (resultPercent > 50 && resultPercent <= 75) {
			result = {
				title: "Хорошо",
				description: `Вы дали ${resultPercent}% правильных ответов. Результат достаточно успешный, он показывает, что вы в целом знаете материал, но есть некоторые пробелы`,
				imageUrl: "/assets/Quizes/Results/3.svg"
			}
		} else if (resultPercent > 75) {
			result = {
				title: "Отлично",
				description: `Вы дали ${resultPercent}% правильных ответов. Это отличный результат. Он означает, что вы усвоили изученный материал`,
				imageUrl: "/assets/Quizes/Results/3.svg"
			}
		}
		return result
	}

	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<SearchBar />
					<PageCommonInfo
						title={quizStatus === 'preview' ? 'Какой ты смешарик?' : ''}
						description={quizStatus === 'preview' ? 'Пройдите простой тест и узнайте, кем бы вы были во вселенной смешариков' : ''}
						breadcrumbs={[
							{ title: "Главная", navigationUrl: "/" },
							{ title: "Квизы", navigationUrl: "/quizes" },
							{ title: "Квизы дня", navigationUrl: "/quizes/hot" },
							{ title: "Какой ты смешарик?", navigationUrl: "/quizes/hot/kakoi-ti-smesharik" },
						]}
					/>
					<section className={s.quiz}>
						{quizStatus !== 'preview'
							&& <div className={s.quiz__info}>
								<span className={s.questions__counter}>Вопрос: {(selectedQuestionIdx + 1) < questions.length ? selectedQuestionIdx + 1 : questions.length} из {questions.length}</span>
								<div className={s.quiz__progress}>
									<span className={s.questions__counter}>Тест на {Math.round((selectedQuestionIdx) / questions.length * 100)}% пройден</span>
									<div className={s.progressbar}>
										<div className={s.progressbar__bg}></div>
										<div className={s.progressbar__active} style={{ width: `${Math.round((selectedQuestionIdx) / questions.length * 100)}%` }}></div>
									</div>
								</div>
							</div>
						}
						{
							quizStatus === 'preview'
								? <div className={s.preivew}>
									<img className={s.preview__img} src={'https://n1s1.hsmedia.ru/10/8a/1c/108a1c3812c316911cede1b1ce9bcf6b/620x349_1_0de024195c2581172fade446a35cafa4@1280x720_0xac120003_19249940001591209586.jpg'} alt="Превью картинка квиза" />
									<span className={s.preview__counter}>Вопросов: {questions.length}</span>
									<button className={s.preview__button} onClick={() => setQuizStatus('running')}>Начать квиз</button>
								</div>
								: quizStatus === 'running'
									? <QuizQuestion
										{...questions[selectedQuestionIdx]}
										onClickNextQuestion={onClickNextQuestion}
									/>
									: <div className={s.result}>
										<img className={s.result__icon} src={getResultInfo().imageUrl} />
										<h3 className={s.result__title}>{getResultInfo().title}</h3>
										<p className={s.result__description}>{getResultInfo().description}</p>
									</div>
						}
					</section>
				</Container>
			</div>
		</Layout>
	)
}
