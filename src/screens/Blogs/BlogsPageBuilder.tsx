import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { iBlogsPageInfo } from '@/pages/blog'
import { FC } from 'react'
import getSlug from 'speakingurl'
import s from './BlogsPageBuilder.module.css'
import { BlogPreview } from './components/BlogPreview/BlogPreview'

interface iProps {
	pageInfo: iBlogsPageInfo
}

export const BlogsPageBuilder: FC<iProps> = ({ pageInfo }) => {
	return (
		<PageLayout className={s.layout}>
			<PageArea>
				<div></div>
				<Container className={s.container}>
					<PageCommonInfo
						title='Блог проекта'
						description='Этот раздел посвящен информации о проекте, его обновлениях и изменениях в целом. Тут разработчики делятся информацией о дальнейшем видении развития DROPMECODE во всех его аспектах.'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Блог", navigationUrl: "/blog" }]}
					/>
					<div className={s.blogs}>
						{pageInfo.items.map((blog) => {
							return (
								<BlogPreview key={blog.id}
									slug={`/blog/${blog.id}-${getSlug(blog.title, { lang: 'ru' })}`}
									title={blog.title}
									dateTime={new Date(blog.create_date).toLocaleString().slice(0, -3)}
									reading_time={blog.reading_time}
								/>
							)
						})}
					</div>
				</Container>
				<div></div>
			</PageArea>
		</PageLayout>
	)
}
