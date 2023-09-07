import { Container } from '@/components/Container/Container'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import s from './BlogsPageBuilder.module.css'

export const BlogsPageBuilder = () => {
	return (
		<PageLayout className={s.layout}>
			<div className={s.area}>
				<Container className={s.container}>
					<PageCommonInfo
						title='Блог проекта'
						description='Этот раздел посвящен информации о проекте, его обновлениях и изменениях в целом. Тут разработчики делятся информацией о дальнейшем видении развития DROPMECODE во всех его аспектах.'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Блог", navigationUrl: "/blog" }]}
					/>
					123
				</Container>
			</div>
		</PageLayout>
	)
}
