import classNames from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import getSlug from 'speakingurl'
import { useGetHandbookThemesQuery } from '../../api/langDocsTheme.api'
import { LangDocsSidebarThemeLoader } from '../LangDocsSidebarThemeLoader/LangDocsSidebarThemeLoader'
import s from './LangDocsLeftSidebar.module.css'

interface iProps {
	handbook: string
	activeThemeId: number
}

export const LangDocsLeftSidebar: FC<iProps> = ({ handbook, activeThemeId }) => {

	const { isLoading, data, error } = useGetHandbookThemesQuery({ handbook })

	if (error) {
		console.log(error)
		throw new Error('Ошибка при загрузке дерева справочника на странице темы')
	}

	return (
		<div className={classNames(s.sidebar, s.sidebar__left)}>
			<div className={s.block}>
				<h4 className={s.block__title}>Дерево разделов</h4>
				{
					!isLoading && data && data.content.length
						? data.content.map((section) => {
							return (
								<div className={s.block__column} key={section.title}>
									{
										section.page.length > 0
											? <div className={s.tree__section}>
												<Link href='/' className={s.tree__part}>{section.part}. {section.title}</Link>
												<div className={s.tree__links}>
													{section.page.map((link) => {
														return (
															<Link
																href={'/langs/' + handbook + `/${link.id}-${getSlug(link.title.toLowerCase(), { lang: 'ru' })}`}
																className={classNames(s.tree__link, { [s.active]: activeThemeId === link.id })}
																key={link.id}
															>
																{section.part}.{link.subpart}. {link.title}
															</Link>
														)
													})}
												</div>
											</div>
											: <div></div>
									}
								</div>
							)
						})
						: <LangDocsSidebarThemeLoader />
				}
			</div>
			<div className={"filler"}></div>
		</div>
	)
}
