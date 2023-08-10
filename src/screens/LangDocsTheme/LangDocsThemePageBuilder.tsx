import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import s from './LangDocsThemePageBuilder.module.css'

export const LangDocsThemePageBuilder = () => {

	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<SearchBar />
					<PageCommonInfo
						title={'Моя первая программа'}
						description='Сегодня мы продолжим изучать язык - Javascript и вы напишете свою первую программу, которая выведет текст в консоль'
						breadcrumbs={[
							{ title: "Главная", navigationUrl: "/" },
							{ title: "Языки программирования", navigationUrl: "/langs" },
							{ title: "Javascript", navigationUrl: "/langs/javascript" },
							{ title: "Моя первая программа", navigationUrl: "/langs/javascript/start" },
						]}
					/>
				</Container>
			</div>
		</Layout>
	)
}
