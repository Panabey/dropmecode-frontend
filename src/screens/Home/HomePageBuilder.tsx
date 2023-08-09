import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import s from './HomePageBuilder.module.css'
import { HomeSearch } from './components/HomeSearch/HomeSearch'
import { HomeInfo } from './components/HomeInfo/HomeInfo'

export const HomePageBuilder = () => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<HomeSearch />
					<HomeInfo />
				</Container>
			</div>
		</Layout>
	)
}
