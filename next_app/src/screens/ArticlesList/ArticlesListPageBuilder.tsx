import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { usePaginator } from '@/hooks/usePaginator'
import { UPLOADS_URL } from '@/lib/constants'
import { iArticlePageInfo } from '@/pages/articles'
import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import getSlug from 'speakingurl'
import s from './ArticlesListPageBuilder.module.css'
import { useGetArticlesMutation } from './api/articles.api'
import { ArticlesListPreview } from './components/ArticlesListPreview/ArticlesListPreview'
import { ArtilcesListPreviewLoader } from './components/ArtilcesListPreviewLoader/ArtilcesListPreviewLoader'

interface iProps {
	pageInfo: iArticlePageInfo
}

export const ArticlesListPageBuilder: FC<iProps> = ({ pageInfo }) => {

	const { items: articles, currentPage, setItems: setArticles, onClickPaginator } = usePaginator(pageInfo.total_page, onLoadArticles, pageInfo.items)

	const [fetchArticles, { isLoading, data, error }] = useGetArticlesMutation()

	function onLoadArticles(action: '+' | '-') {
		if (action === '+') {
			fetchArticles({ limit: 20, page: currentPage + 1 })
			return
		}
		if (action === '-') {
			fetchArticles({ limit: 20, page: currentPage - 1 })
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
				<div></div>
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
					<div className={s.paginator}>
						<IoIosArrowBack fill="#000" className={classNames(s.arrow, { [s.disabled]: currentPage <= 1 })} size={20} onClick={() => onClickPaginator('-')} />
						<aside className={s.page__current}>
							{currentPage}
						</aside>
						<IoIosArrowForward fill="#000" className={classNames(s.arrow, { [s.disabled]: currentPage >= pageInfo.total_page })} size={20} onClick={() => onClickPaginator('+')} />
					</div>
				</Container>
				<div></div>
			</PageArea>
		</PageLayout>
	)
}