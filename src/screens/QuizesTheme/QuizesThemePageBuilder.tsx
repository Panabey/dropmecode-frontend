import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { iQuizesThemePage } from '@/pages/quizes/[theme]'
import { useRouter } from 'next/router'
import { FC } from 'react'
import getSlug from 'speakingurl'
import { QuizPreview } from '../Quizes/components/QuizPreview/QuizPreview'
import s from './QuizesThemePageBuilder.module.css'

interface iProps {
	pageInfo: iQuizesThemePage
}

export const QuizesThemePageBuilder: FC<iProps> = ({ pageInfo }) => {

	const router = useRouter()

	return (
		<PageLayout>
			<PageArea>
				<div></div>
				<Container className={s.container}>
					<PageCommonInfo
						title={pageInfo.title}
						description={`Горячие и интересные квизы по теме "${pageInfo.title}", специально для вас. Пройдите их и оцените свои дедуктивные способности.`}
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Квизы", navigationUrl: "/quizes" }, { title: pageInfo.title, navigationUrl: `/quizes/${router.query.theme}` }]}
					/>
					<section className={s.section}>
						<div className={s.quizes}>
							{pageInfo.quizzes.map((quiz) => {
								return (
									<QuizPreview
										key={quiz.id}
										{...quiz}
										slug={`/quizes/content/${quiz.id}-${getSlug(quiz.title, { lang: 'ru' })}`}
									/>
								)
							})}
						</div>
					</section>
				</Container>
				<div></div>
			</PageArea>
		</PageLayout>
	)
}
