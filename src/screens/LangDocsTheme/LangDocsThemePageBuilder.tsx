import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { mdtest } from '@/lib/mdtest'
import classNames from 'classnames'
import { FC } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import s from './LangDocsThemePageBuilder.module.css'

interface iProps {
	mdData: any
}

export const LangDocsThemePageBuilder: FC<iProps> = ({ mdData }) => {

	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<SearchBar />
					<PageCommonInfo
						title={'Моя первая программа'}
						description='Сегодня мы продолжим изучать язык - Javascript и вы напишете свою первую программу, которая выведет текст в консоль'
						breadcrumbs={[
							{ title: "Главная", navigationUrl: "/" },
							{ title: "Языки программирования", navigationUrl: "/langs" },
							{ title: "Javascript", navigationUrl: "/langs/javascript" },
							{ title: "Моя первая программа", navigationUrl: "/langs/javascript/start" },
						]}
					/>
					<ReactMarkdown
						className={classNames(s.markdown, 'markdown-body')}
					>
						{mdtest}
					</ReactMarkdown>
				</Container>
			</div>
		</Layout>
	)
}
