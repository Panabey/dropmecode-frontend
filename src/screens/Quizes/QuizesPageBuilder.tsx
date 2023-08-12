import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import s from './QuizesPageBuilder.module.css'

export const QuizesPageBuilder = () => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<SearchBar />
					<PageCommonInfo
						title='Квизы'
						description='Занимательные и развлекательные квиз-тесты для закрепления полученных знаний в области IT и не только!'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Квизы", navigationUrl: "/quizes" }]}
					/>
				</Container>
			</div>
		</Layout>
	)
}
