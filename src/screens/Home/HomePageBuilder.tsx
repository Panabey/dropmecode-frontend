import { Layout } from '@/components/Layout/Layout'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import s from './HomePageBuilder.module.css'

export const HomePageBuilder = () => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>HomePageBuilder</div>
		</Layout>
	)
}
