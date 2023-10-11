import { Container } from '@/components/Container/Container'
import { MarkdownRender } from '@/components/MarkdownRender/MarkdownRender'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { useHeadingsNavigation } from '@/hooks/useHeadingsNavigation'
import { iArticle } from '@/pages/articles/[slug]'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiOutlineClockCircle, AiOutlineRead, AiOutlineTag } from 'react-icons/ai'
import getSlug from 'speakingurl'
import s from './ArticlePageBuilder.module.css'
import { ArticleRightSidebar } from './components/ArticleRightSidebar/ArticleRightSidebar'

interface iProps {
	article: iArticle
}

export const ArticlePageBuilder: FC<iProps> = ({ article }) => {

	const router = useRouter()

	const { pageNavigationLinks } = useHeadingsNavigation(s.markdown, String(router.query.slug))

	return (
		<PageLayout className={s.layout}>
			<PageArea className={s.area}>
				<div></div>
				<Container className={s.container}>
					<PageCommonInfo
						title={article.title}
						breadcrumbs={[
							{ title: "Главная", navigationUrl: "/" },
							{ title: "Статьи", navigationUrl: "/articles" },
							{ title: article.title, navigationUrl: `/articles/${getSlug(article.title, { lang: 'ru' })}` },
						]}
					/>
					<div className={s.metainfo}>
						<div className={s.metainfo__row}>
							<span className={s.metainfo__label}><AiOutlineClockCircle fill="#1F477D" size={19} /></span>
							<aside className={s.metainfo__datetime}>{new Date(article.create_date).toLocaleString().slice(0, -3)}</aside>
						</div>
						{
							article.tags.length
								? <div className={s.metainfo__row}>
									<span className={s.metainfo__label}><AiOutlineTag fill="#1F477D" size={19} /></span>
									<div className={s.metainfo__tags}>
										{article.tags.map((tag) => {
											return (
												<span className={s.metainfo__tag} key={tag}>{tag}</span>
											)
										})}
									</div>
								</div>
								: <></>
						}
						<div className={s.metainfo__row}>
							<span className={s.metainfo__label}><AiOutlineRead fill="#1F477D" size={19} /></span>
							<aside className={s.metainfo__datetime}> {article.reading_time} мин. на чтение</aside>
						</div>
					</div>
					<aside className={s.description}>{article.anons}</aside>
					<MarkdownRender
						className={classNames(s.markdown, 'markdown-body')}
					>
						{article.text}
					</MarkdownRender>
					<footer className={s.container__footer}>
						<hr className={s.container__underline} />
						<div className={s.footer__metainfo}>
							<div className={s.metainfo__row}>
								<span className={s.metainfo__label}>Статья изменена:</span>
								<aside className={s.metainfo__datetime}> {new Date(article.update_date).toLocaleString().slice(0, -3)}</aside>
							</div>
						</div>
					</footer>
				</Container>
				{pageNavigationLinks.length
					&& router.isReady
					? <div className={s.layout__sidebar_right}>
						<ArticleRightSidebar navigationLinks={pageNavigationLinks} />
					</div>
					: <></>
				}
			</PageArea>
		</PageLayout>
	)
}
