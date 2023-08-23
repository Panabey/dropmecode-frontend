import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { MarkdownRender } from '@/components/MarkdownRender/MarkdownRender'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { capitalizeString } from '@/lib/utils'
import { iLangDocs } from '@/pages/langs/[id]/[theme]'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import getSlug from 'speakingurl'
import s from './LangDocsThemePageBuilder.module.css'
import { LangDocsRightSidebar } from './components/LangDocsRightSidebar/LangDocsRightSidebar'

interface iProps {
	langDocs: iLangDocs
}

export interface iPageLink {
	title: string
	anchor: string
	active: boolean
}

export const LangDocsThemePageBuilder: FC<iProps> = ({ langDocs }) => {
	const router = useRouter()

	const [pageNavigationLinks, setPageNavigationLinks] = useState<iPageLink[]>([]);

	useEffect(() => {
		function highlightActiveLink() {
			const renderedMD = document.querySelector("." + s.markdown)
			if (!renderedMD) {
				return
			}
			const headings = renderedMD.getElementsByTagName("h2");
			if (!headings || !headings.length) {
				return
			}
			let activeIdx = 0;
			for (let i = 1; i < headings.length; i++) {
				const prevHeading = headings[i - 1].getBoundingClientRect();
				if (i === 1 && prevHeading.top > 0) {
					activeIdx = 0;
					break
				}
				const nextNeading = headings[i].getBoundingClientRect();
				if (prevHeading.top < 0 && nextNeading.top > 0) {
					activeIdx = i;
					break;
				}
			}
			if (pageNavigationLinks[activeIdx].active) {
				return
			}
			setPageNavigationLinks((prev) => prev.map((link, idx) => (idx !== activeIdx) ? { ...link, active: false } : { ...link, active: true }))
		}

		window.addEventListener('scroll', highlightActiveLink)

		return () => {
			window.removeEventListener('scroll', highlightActiveLink)
		}
	}, [pageNavigationLinks])

	useEffect(() => {
		let timer: number | undefined | NodeJS.Timer;
		if (pageNavigationLinks.length === 0) {
			timer = setInterval(() => {
				const renderedMD = document.querySelector("." + s.markdown)
				if (!renderedMD) {
					return
				}
				const headings = renderedMD.getElementsByTagName("h2");
				if (!headings || !headings.length) {
					return
				}
				if (headings.length === pageNavigationLinks.length) {
					clearInterval(timer)
					return
				}
				const links: iPageLink[] = []
				for (let i = 0; i < headings.length; i++) {
					headings[i].id = headings[i].id.length > 0 ? 'anchor_' + (i + 1) + ' ' + headings[i].id : 'anchor_' + (i + 1);
					links.push({ title: headings[i].textContent || '', anchor: '#anchor_' + (i + 1), active: false })
					if (i === 0) {
						links[0].active = true
					}
				}
				setPageNavigationLinks(links);
			}, 100)
		}

		return () => {
			clearInterval(timer)
		}
	}, [pageNavigationLinks])

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
