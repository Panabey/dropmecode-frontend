import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { UPLOADS_URL } from '@/lib/constants'
import { iQuizesPageInfo } from '@/pages/quizes'
import Link from 'next/link'
import { FC } from 'react'
import getSlug from 'speakingurl'
import s from './QuizesPageBuilder.module.css'
import { QuizPreview, iQuizPreview } from './components/QuizPreview/QuizPreview'

export const quizes: iQuizPreview[] = [{
	id: 1,
	slug: "kakoy-ti-smesharik",
	description: "Пройдите простой тест и узнайте, кем бы вы были во вселенной смешариков",
	imageUrl: "/assets/Quizes/1.jpg",
	title: "Кто ты из смешариков?",
},
{
	id: 2,
	slug: "chei-crym",
	description: "Проявите дедуктивные способности и определите, какой же стране принадлежит полуостров - Крым",
	imageUrl: "/assets/Quizes/2.jpg",
	title: "Кому принадлежит Крым?",
},
{
	id: 3,
	slug: "test-na-znanie-yazika-programmirovanya-javascrpit",
	description: "Вы думаете, что хорошо знаете язык программирования - Javascript? Сейчас мы это проверим :)",
	imageUrl: "/assets/Quizes/js.png",
	title: "Как хорошо ты знаешь Javascript?",
},
]

interface iProps {
	pageInfo: iQuizesPageInfo[]
}

export const QuizesPageBuilder: FC<iProps> = ({ pageInfo }) => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<PageCommonInfo
						title='Квизы'
						description='Занимательные и развлекательные квиз-тесты для закрепления полученных знаний в области IT и не только!'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Квизы", navigationUrl: "/quizes" }]}
					/>
					{pageInfo.map((info) => {
						return (
							<section className={s.section} key={info.id}>
								<div className={s.section__row}>
									<h3 className={s.section__title}>{info.title}</h3>
									<Link className={s.section__details} href={`/quizes/${info.id}-${getSlug(info.title, { lang: 'ru' })}`}>Показать все</Link>
								</div>
								<div className={s.quizes}>
									{info.quizzes.map((quiz, idx) => {
										return (
											<QuizPreview
												key={quiz.id}
												{...quizes[idx]}
												id={quiz.id}
												imageUrl={UPLOADS_URL + quiz.logo_url}
												title={quiz.title}
												slug={`/quizes/${info.id}-${getSlug(info.title, { lang: 'ru' })}/${quiz.id}-${getSlug(quiz.title, { lang: 'ru' })}`}
											/>
										)
									})}
								</div>
							</section>
						)
					})}
				</Container>
			</div>
		</Layout>
	)
}
