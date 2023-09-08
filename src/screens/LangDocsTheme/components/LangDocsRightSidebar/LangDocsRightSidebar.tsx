import classNames from 'classnames'
import { FC } from 'react'
import s from './LangDocsRightSidebar.module.css'
import { iPageLink } from '@/hooks/useHeadingsNavigation'

interface iProps {
	navigationLinks: iPageLink[]
}

export const LangDocsRightSidebar: FC<iProps> = ({ navigationLinks }) => {

	return (
		<div className={s.sidebar}>
			<div className={s.filler}></div>
			<div className={s.block}>
				<h4 className={s.block__title}>На этой странице</h4>
				<div className={s.block__column}>
					{navigationLinks.map((link) => {
						return (
							<a href={link.anchor} className={classNames(s.block__link, { [s.active]: link.active })} key={link.anchor}>{link.title}</a>
						)
					})}
				</div>
			</div>
		</div>
	)
}
