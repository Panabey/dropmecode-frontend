import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { iQuizesinfo } from '@/pages/quizes'
import { FC } from 'react'
import s from './QuizesThemePageBuilder.module.css'
import { QuizPreview } from '../Quizes/components/QuizPreview/QuizPreview'
import { useRouter } from 'next/router'
import getSlug from 'speakingurl'
import { iQuizesThemePage } from '@/pages/quizes/[theme]'
import { PageLayout } from '@/components/PageLayout/PageLayout'

interface iProps {
	pageInfo: iQuizesThemePage
}

export const QuizesThemePageBuilder: FC<iProps> = ({ pageInfo }) => {

	const router = useRouter()

	return (
		<PageLayout>
			<div className={s.area}>
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
										slug={`/quizes/${router.query.theme}/${quiz.id}-${getSlug(quiz.title, { lang: 'ru' })}`}
									/>
								)
							})}
						</div>
					</section>
				</Container>
			</div>
		</PageLayout>
	)
}
