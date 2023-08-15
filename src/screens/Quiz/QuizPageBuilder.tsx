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
										onClickNextQuestion={() => selectedQuestionIdx < questions.length - 1 ? setSelectedQuestionIdx((prev) => prev + 1) : () => { }}
									/>
									: <></>
						}
					</section>
				</Container>
			</div>
		</Layout>
	)
}
