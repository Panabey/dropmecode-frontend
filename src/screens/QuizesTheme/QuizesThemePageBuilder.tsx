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

interface iProps {
	pageInfo: iQuizesinfo[]
}

export const QuizesThemePageBuilder: FC<iProps> = ({ pageInfo }) => {

	const router = useRouter()

	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<PageCommonInfo
						title='Квизы дня'
						description='Горячие и интересные квизы, доступные только сегодня, специально для вас. Пройдите их и оцените свои интеллектуальные способности в мире IT'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Квизы", navigationUrl: "/quizes" }, { title: "Квизы дня", navigationUrl: '/quizes/hot' }]}
					/>
					<section className={s.section}>
						<div className={s.quizes}>
							{pageInfo.map((quiz) => {
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
		</Layout>
	)
}
