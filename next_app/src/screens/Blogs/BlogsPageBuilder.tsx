import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { Paginator } from '@/components/Paginator/Paginator'
import { usePaginator } from '@/hooks/usePaginator'
import { iBlogsPageInfo } from '@/pages/blog'
import { FC, useEffect } from 'react'
import getSlug from 'speakingurl'
import s from './BlogsPageBuilder.module.css'
import { useGetBlogsPreviewsMutation } from './api/blogs.api'
import { BlogPreview } from './components/BlogPreview/BlogPreview'
import { BlogPreviewLoader } from './components/BlogPreviewLoader/BlogPreviewLoader'

interface iProps {
	pageInfo: iBlogsPageInfo
}

export const BlogsPageBuilder: FC<iProps> = ({ pageInfo }) => {

	const { items: blogs, currentPage, setItems: setBlogs, onClickPaginator, setPagePaginator } = usePaginator(pageInfo.total_page, onLoadBlogs, pageInfo.items)

	const [fetchBlogs, { isLoading, data, error }] = useGetBlogsPreviewsMutation()

	function onLoadBlogs(action: '+' | '-' | undefined, page: number) {
		if (action === '+') {
			fetchBlogs({ limit: 20, page })
			return
		}
		if (action === '-') {
			fetchBlogs({ limit: 20, page })
			return
		}
		if (action === undefined) {
			fetchBlogs({ limit: 20, page })
		}
	}

	useEffect(() => {
		if (!isLoading && data) {
			setBlogs(data.items)
		}
	}, [data, isLoading])

	if (error) {
		console.error(error)
		throw new Error('Ошибка при загрузке превьюшек блога из запроса пагинатора')
	}

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
						{isLoading
							? new Array(10).fill(null).map((_, idx) => {
								return (
									<BlogPreviewLoader key={idx} />
								)
							})
							: blogs.map((blog) => {
								return (
									<BlogPreview key={blog.id}
										slug={`/blog/${blog.id}-${getSlug(blog.title, { lang: 'ru' })}`}
										title={blog.title}
										dateTime={new Date(blog.create_date).toLocaleString().slice(0, -3)}
										reading_time={blog.reading_time}
									/>
								)
							})
						}
					</div>
					<Paginator currentPage={currentPage} onClickPaginator={onClickPaginator} totalPage={pageInfo.total_page} setPagePaginator={setPagePaginator} />
				</Container>
				<div></div>
			</PageArea>
		</PageLayout>
	)
}
