import { Container } from '@/components/Container/Container'
import { MarkdownRender } from '@/components/MarkdownRender/MarkdownRender'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { useHeadingsNavigation } from '@/hooks/useHeadingsNavigation'
import { capitalizeString } from '@/lib/utils'
import { iLangDocs } from '@/pages/langs/[id]/[theme]'
import { useRouter } from 'next/router'
import { FC } from 'react'
import getSlug from 'speakingurl'
import s from './LangDocsThemePageBuilder.module.css'
import { LangDocsLeftSidebar } from './components/LangDocsLeftSidebar/LangDocsLeftSidebar'
import { LangDocsRightSidebar } from './components/LangDocsRightSidebar/LangDocsRightSidebar'

interface iProps {
	langDocs: iLangDocs
}

export const LangDocsThemePageBuilder: FC<iProps> = ({ langDocs }) => {
	const router = useRouter()

	const { pageNavigationLinks } = useHeadingsNavigation(s.markdown, String(router.query.theme))

	return (
		<>
			<PageLayout className={s.layout}>
				<PageArea>
					<div className={s.layout__sidebar_left}>{router.isReady && <LangDocsLeftSidebar activeThemeId={Number(String(router.query.theme).split('-')[0])} handbook={String(router.query.id)} />}</div>
					<Container className={s.container}>
						<PageCommonInfo
							title={langDocs.title}
							description=""
							breadcrumbs={[
								{ title: "Главная", navigationUrl: "/" },
								{ title: "Справочники", navigationUrl: "/langs" },
								{ title: capitalizeString(String(router.query.id)), navigationUrl: "/langs/" + String(router.query.id) },
								{
									title: langDocs.title.split(' ').filter((_, idx) => idx !== 0).join(' '),
									navigationUrl: "/langs/" + String(router.query.id) + `/${langDocs.id}-${getSlug(langDocs.title.split(' ').filter((_, idx) => idx !== 0).join(' ').toLowerCase(), { lang: 'ru' })}`
								},
							]}
						/>
						<MarkdownRender className={s.markdown}>{langDocs.text}</MarkdownRender>
						<footer className={s.container__footer}>
						<hr className={s.container__underline} />
						<div className={s.footer__metainfo}>
							<div className={s.metainfo__row}>
								<span className={s.metainfo__label}>Статья изменена:</span>
								<aside className={s.metainfo__datetime}> {new Date(langDocs.update_date).toLocaleString().slice(0, -3)}</aside>
							</div>
						</div>
					</footer>
					</Container>
					<div className={s.layout__sidebar_right}>
						{pageNavigationLinks.length && router.isReady ? <LangDocsRightSidebar navigationLinks={pageNavigationLinks} /> : <></>}
					</div>
				</PageArea>
			</PageLayout>
		</>
	)
}
