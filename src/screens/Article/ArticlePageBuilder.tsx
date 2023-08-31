import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { iArticle } from '@/pages/articles/[slug]'
import classNames from 'classnames'
import { FC } from 'react'
import { AiOutlineClockCircle, AiOutlineTag } from 'react-icons/ai'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
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
						description='Как сообщают последние события, знаменитые программисты из МиВЛГУ в г.Муром, переквалифицировались в депутатов государственной думы'
						breadcrumbs={[
							{ title: "Главная", navigationUrl: "/" },
							{ title: "Статьи", navigationUrl: "/articles" },
							{ title: article.title, navigationUrl: `/articles/${getSlug(article.title, { lang: 'ru' })}` },
						]}
					/>
					<div className={s.metainfo}>
						<div className={s.metainfo__row}>
							<span className={s.metainfo__label}><AiOutlineClockCircle fill="#1F477D" size={19} /></span>
							<aside className={s.metainfo__datetime}>10.08.2023 20:38</aside>
						</div>
						<div className={s.metainfo__row}>
							<span className={s.metainfo__label}><AiOutlineTag fill="#1F477D" size={19} /></span>
							<div className={s.metainfo__tags}>
								<span className={s.metainfo__tag}>IT</span>
								<span className={s.metainfo__tag}>Политика</span>
								<span className={s.metainfo__tag}>Достопримечательности</span>
							</div>
						</div>
					</div>

					<ReactMarkdown
						className={classNames(s.markdown, 'markdown-body')}
					>
						{article.text}
					</ReactMarkdown>
				</Container>
			</div>
		</Layout>
	)
}
