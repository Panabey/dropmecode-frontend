import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { Paginator } from '@/components/Paginator/Paginator'
import { usePaginator } from '@/hooks/usePaginator'
import { UPLOADS_URL } from '@/lib/constants'
import { iArticlePageInfo } from '@/pages/articles'
import { FC, useEffect } from 'react'
import getSlug from 'speakingurl'
import s from './ArticlesListPageBuilder.module.css'
import { useGetArticlesMutation } from './api/articles.api'
import { ArticlesListPreview } from './components/ArticlesListPreview/ArticlesListPreview'
import { ArticlesListRightSidebar } from './components/ArticlesListRightSidebar/ArticlesListRightSidebar'
import { ArtilcesListPreviewLoader } from './components/ArtilcesListPreviewLoader/ArtilcesListPreviewLoader'
interface iProps {
	pageInfo: iArticlePageInfo
}

export const ArticlesListPageBuilder: FC<iProps> = ({ pageInfo }) => {

	const { items: articles, currentPage, setItems: setArticles, onClickPaginator, setPagePaginator } = usePaginator(pageInfo.total_page, onLoadArticles, pageInfo.items, false, pageInfo.current_page)

	const [fetchArticles, { isLoading, data, error }] = useGetArticlesMutation()

	function onLoadArticles(action: '+' | '-' | undefined, page: number) {
		if (action === '+') {
			fetchArticles({ limit: 5, page })
			return
		}
		if (action === '-') {
			fetchArticles({ limit: 5, page })
			return
		}
		if (action === undefined) {
			fetchArticles({ limit: 5, page })
			return
		}
	}

	useEffect(() => {
		if (!isLoading && data) {
			setArticles(data.items)
		}
	}, [data, isLoading])

	if (error) {
		console.error(error)
		throw new Error('Ошибка при загрузке превьюшек статей из запроса пагинатора')
	}

	return (
		<PageLayout className={s.layout}>
			<PageArea className={s.area}>
				<div className={s.filler}></div>
				<Container className={s.container}>
					<PageCommonInfo
						title='Статьи'
						description='В этом разделе вы всегда можете прочитать интересные статьи из мира IT и технологий. Мы тщательно отбираем материал и компилируем только интересные статьи, некоторые пишем сами с нуля :)'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Статьи", navigationUrl: "/articles" }]}
					/>
					<div className={s.news}>
						{isLoading
							? new Array(15).fill(null).map((_, idx) => {
								return (
									<ArtilcesListPreviewLoader key={idx} />
								)
							})
							: articles.map((article) => {
								return (
									<ArticlesListPreview
										key={article.id}
										slug={`/articles/${article.id}-${getSlug(article.title, { lang: 'ru' })}`}
										title={article.title}
										dateTime={new Date(article.create_date).toLocaleString().slice(0, -3)}
										description={article.anons}
										imageUrl={article.logo_url.length ? UPLOADS_URL + article.logo_url : ''}
										tags={article.tags}
									/>
								)
							})
						}
					</div>
					<Paginator currentPage={currentPage} onClickPaginator={onClickPaginator} totalPage={pageInfo.total_page} setPagePaginator={setPagePaginator} />
				</Container>
				<div className={s.layout__sidebar_right}>
					<ArticlesListRightSidebar />
				</div>
			</PageArea>
		</PageLayout>
	)
}
