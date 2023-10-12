import { iPageLink } from '@/hooks/useHeadingsNavigation'
import classNames from 'classnames'
import { FC } from 'react'
import s from './BlogRightSidebar.module.css'

interface iProps {
	navigationLinks: iPageLink[]
}

export const BlogRightSidebar: FC<iProps> = ({ navigationLinks }) => {

	return (
		<div className={s.sidebar}>
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
