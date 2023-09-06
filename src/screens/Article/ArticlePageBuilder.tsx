import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { MarkdownRender } from '@/components/MarkdownRender/MarkdownRender'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { iArticle } from '@/pages/articles/[slug]'
import classNames from 'classnames'
import { FC } from 'react'
import { AiOutlineClockCircle, AiOutlineRead, AiOutlineTag } from 'react-icons/ai'
import getSlug from 'speakingurl'
import s from './ArticlePageBuilder.module.css'

interface iProps {
	article: iArticle
}

export const ArticlePageBuilder: FC<iProps> = ({ article }) => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<PageCommonInfo
						title={article.title}
						description={article.anons}
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
			</div>
		</Layout>
	)
}
