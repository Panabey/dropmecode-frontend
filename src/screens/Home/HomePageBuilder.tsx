import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import s from './HomePageBuilder.module.css'
import { HomeInfo } from './components/HomeInfo/HomeInfo'
import { HomeRightSidebar } from './components/HomeRightSidebar/HomeRightSidebar'

export const HomePageBuilder = () => {
	return (
		<PageLayout className={s.layout}>
			<PageArea>
				<div></div>
				<Container className={s.container}>
					<HomeInfo />
				</Container>
				<div className={s.layout__sidebar_right}>
					<HomeRightSidebar />
				</div>
			</PageArea>
		</PageLayout>
	)
}
