import { Container } from '@/components/Container/Container'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { iQuizesPageInfo } from '@/pages/quizes'
import Link from 'next/link'
import { FC } from 'react'
import getSlug from 'speakingurl'
import s from './QuizesPageBuilder.module.css'
import { QuizPreview } from './components/QuizPreview/QuizPreview'
import { PageArea } from '@/components/PageArea/PageArea'

interface iProps {
	pageInfo: iQuizesPageInfo[]
}

export const QuizesPageBuilder: FC<iProps> = ({ pageInfo }) => {
	return (
		<PageLayout className={s.layout}>
			<PageArea>
				<div></div>
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
				</Container>
				<div></div>
			</PageArea>
		</PageLayout>
	)
}
