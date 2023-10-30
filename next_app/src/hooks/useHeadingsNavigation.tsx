import { useEffect, useState } from 'react'

export interface iPageLink {
	title: string
	anchor: string
	active: boolean
}

export const useHeadingsNavigation = (markdownClassName: string, reloadAction?: any) => {
	const [pageNavigationLinks, setPageNavigationLinks] = useState<iPageLink[]>([]);

	useEffect(() => {
		function highlightActiveLink() {
			const renderedMD = document.querySelector("." + markdownClassName)
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
			if (
				Array.isArray(pageNavigationLinks)
				&& typeof pageNavigationLinks[activeIdx] === 'object'
				&& pageNavigationLinks[activeIdx].hasOwnProperty('active')
				&& pageNavigationLinks[activeIdx].active
			) {
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
		let timer: any;
		if (pageNavigationLinks.length === 0) {
			timer = setInterval(() => {
				const renderedMD = document.querySelector("." + markdownClassName)
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
					headings[i].id = 'anchor_' + (i + 1);
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

	useEffect(() => {
		setPageNavigationLinks([])
	}, [reloadAction, setPageNavigationLinks])

	return { pageNavigationLinks }

}