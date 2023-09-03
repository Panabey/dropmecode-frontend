import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { UPLOADS_URL } from '@/lib/constants'
import { iArticlePageInfo } from '@/pages/articles'
import { FC } from 'react'
import getSlug from 'speakingurl'
import s from './ArticlesListPageBuilder.module.css'
import { ArticlesListPreview } from './components/ArticlesListPreview'

interface iProps {
	pageInfo: iArticlePageInfo
}

export const ArticlesListPageBuilder: FC<iProps> = ({ pageInfo }) => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<PageCommonInfo
						title='Статьи'
						description='В этом разделе вы всегда можете прочитать интересные статьи из мира IT и технологий. Мы тщательно отбираем материал и компилируем только интересные статьи, некоторые пишем сами с нуля :)'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Статьи", navigationUrl: "/articles" }]}
					/>
					<div className={s.news}>
						{pageInfo.items.map((article) => {
							return (
								<ArticlesListPreview
									key={article.id}
									slug={`/articles/${article.id}-${getSlug(article.title, { lang: 'ru' })}`}
									title={article.title}
									dateTime={new Date(article.create_date).toLocaleString().slice(0, -3)}
									description={article.anons}
									imageUrl={UPLOADS_URL + article.logo_url}
									tags={article.tags}
								/>
							)
						})}

					</div>
				</Container>
			</div>
		</Layout>
	)
}
