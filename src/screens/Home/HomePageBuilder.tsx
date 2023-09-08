import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import s from './HomePageBuilder.module.css'
import { HomeInfo } from './components/HomeInfo/HomeInfo'

export const HomePageBuilder = () => {
	return (
		<PageLayout className={s.layout}>
			<PageArea>
				<div></div>
				<Container className={s.container}>
					<HomeInfo />
				</Container>
				<div></div>
			</PageArea>
		</PageLayout>
	)
}
