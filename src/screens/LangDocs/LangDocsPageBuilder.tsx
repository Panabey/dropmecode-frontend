import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import s from './LangDocsPageBuilder.module.css'

export const LangDocsPageBuilder = () => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<SearchBar />
					<PageCommonInfo
						title='Javascript'
						description='При помощи данного справочника вы сможете освоить основы языка - Javascript и начать писать на нем простые программы. Мир Javascript многогранен, поэтому при помощи этого языка вы способны решить множество различных задач'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Языки программирования", navigationUrl: "/langs" }, { title: "Javascript", navigationUrl: "/langs/javascript" }]}
					/>
				</Container>
			</div>
		</Layout>
	)
}
