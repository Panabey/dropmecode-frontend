import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { quizes } from '../Quizes/QuizesPageBuilder'
import { QuizPreview } from '../Quizes/components/QuizPreview/QuizPreview'
import s from './QuizesThemePageBuilder.module.css'

export const QuizesThemePageBuilder = () => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<SearchBar />
					<PageCommonInfo
						title='Квизы дня'
						description='Горячие и интересные квизы, доступные только сегодня, специально для вас. Пройдите их и оцените свои интеллектуальные способности в мире IT'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Квизы", navigationUrl: "/quizes" }, { title: "Квизы дня", navigationUrl: '/quizes/hot' }]}
					/>
					<section className={s.section}>
						<div className={s.quizes}>
							{[...quizes, ...quizes, ...quizes].map((quiz) => {
								return (
									<QuizPreview key={quiz.id} {...quiz} />
								)
							})}
						</div>
					</section>
				</Container>
			</div>
		</Layout>
	)
}
