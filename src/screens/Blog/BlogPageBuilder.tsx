import { Container } from '@/components/Container/Container'
import { MarkdownRender } from '@/components/MarkdownRender/MarkdownRender'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { useHeadingsNavigation } from '@/hooks/useHeadingsNavigation'
import { iBlog } from '@/pages/blog/[id]'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiOutlineClockCircle, AiOutlineRead } from 'react-icons/ai'
import getSlug from 'speakingurl'
import s from './BlogPageBuilder.module.css'
import { BlogRightSidebar } from './components/BlogRightSidebar/BlogRightSidebar'

interface iProps {
	blog: iBlog
}

export const BlogPageBuilder: FC<iProps> = ({ blog }) => {

	const router = useRouter()

	const { pageNavigationLinks } = useHeadingsNavigation(s.markdown, String(router.query.slug))

	return (
		<PageLayout className={s.layout}>
			<PageArea>
				<div className={s.filler}></div>
				<Container className={s.container}>
					<PageCommonInfo
						title={blog.title}
						description={''}
						breadcrumbs={[
							{ title: "Главная", navigationUrl: "/" },
							{ title: "Блог", navigationUrl: "/blog" },
							{ title: blog.title, navigationUrl: `/blog/${getSlug(blog.title, { lang: 'ru' })}` },
						]}
					/>
					<div className={s.metainfo}>
						<div className={s.metainfo__row}>
							<span className={s.metainfo__label}><AiOutlineClockCircle fill="#1F477D" size={19} /></span>
							<aside className={s.metainfo__datetime}>{new Date(blog.create_date).toLocaleString().slice(0, -3)}</aside>
						</div>
						<div className={s.metainfo__row}>
							<span className={s.metainfo__label}><AiOutlineRead fill="#1F477D" size={19} /></span>
							<aside className={s.metainfo__datetime}> {blog.reading_time} мин. на чтение</aside>
						</div>
					</div>

					<MarkdownRender
						className={classNames(s.markdown, 'markdown-body')}
					>
						{blog.text}
					</MarkdownRender>
				</Container>
				{pageNavigationLinks.length
					&& router.isReady
					? <div>
						<BlogRightSidebar navigationLinks={pageNavigationLinks} />
					</div>
					: <></>
				}
			</PageArea>
		</PageLayout>
	)
}
