import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { HelpContacts } from './HelpContacts/HelpContacts'
import { HelpFaq } from './HelpFaq/HelpFaq'
import s from './HelpPageBuilder.module.css'

export const HelpPageBuilder = () => {
	return (
		<PageLayout className={s.layout}>
			<PageArea>
				<div></div>
				<Container className={s.container}>
					<PageCommonInfo
						title='Помощь'
						description='В этом разделе приведена контакнтая информация по связи с разработчиками проекта. Если вы хотите задать свой вопрос или написать пожелание по развитию проекта, изучите материал на данной странице'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Помощь", navigationUrl: "/help" }]}
					/>
					<HelpContacts />
					<HelpFaq />
				</Container>
				<div></div>
			</PageArea>
		</PageLayout>
	)
}
