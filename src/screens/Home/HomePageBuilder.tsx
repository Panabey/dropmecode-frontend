import { Container } from '@/components/Container/Container'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import s from './HomePageBuilder.module.css'
import { HomeInfo } from './components/HomeInfo/HomeInfo'

export const HomePageBuilder = () => {
	return (
		<PageLayout className={s.layout}>
			<div className={s.area}>
				<Container className={s.container}>
					<HomeInfo />
				</Container>
			</div>
		</PageLayout>
	)
}
