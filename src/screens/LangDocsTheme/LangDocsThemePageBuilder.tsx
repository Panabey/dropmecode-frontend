import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { MarkdownRender } from '@/components/MarkdownRender/MarkdownRender'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { useHeadingsNavigation } from '@/hooks/useHeadingsNavigation'
import { capitalizeString } from '@/lib/utils'
import { iLangDocs } from '@/pages/langs/[id]/[theme]'
import { useRouter } from 'next/router'
import { FC } from 'react'
import getSlug from 'speakingurl'
import s from './LangDocsThemePageBuilder.module.css'
import { LangDocsRightSidebar } from './components/LangDocsRightSidebar/LangDocsRightSidebar'

interface iProps {
	langDocs: iLangDocs
}

export const LangDocsThemePageBuilder: FC<iProps> = ({ langDocs }) => {
	const router = useRouter()

	const { pageNavigationLinks } = useHeadingsNavigation(s.markdown)

	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<div dangerouslySetInnerHTML={{ __html: langDocs.meta }}></div>
					<div className={s.searchbar}>
						<SearchBar />
					</div>
					<PageCommonInfo
						title={langDocs.title}
						description='Сегодня мы продолжим изучать язык - Javascript и вы напишете свою первую программу, которая выведет текст в консоль'
						breadcrumbs={[
							{ title: "Главная", navigationUrl: "/" },
							{ title: "Языки программирования", navigationUrl: "/langs" },
							{ title: capitalizeString(String(router.query.id)), navigationUrl: "/langs/" + String(router.query.id) },
							{
								title: langDocs.title.split(' ').filter((_, idx) => idx !== 0).join(' '),
								navigationUrl: "/langs/" + String(router.query.id) + `/${langDocs.id}-${getSlug(langDocs.title.split(' ').filter((_, idx) => idx !== 0).join('').toLowerCase(), { lang: 'ru' })}`
							},
						]}
					/>
					<MarkdownRender className={s.markdown}>{langDocs.text}</MarkdownRender>
				</Container>
			</div>
			{pageNavigationLinks.length ? <LangDocsRightSidebar navigationLinks={pageNavigationLinks} /> : <></>}
		</Layout>
	)
}
