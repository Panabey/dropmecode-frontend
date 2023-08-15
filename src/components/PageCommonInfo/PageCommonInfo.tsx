import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'
import s from './PageCommonInfo.module.css'

export interface iBreadcrumb {
	title: string
	navigationUrl: string

}

interface iProps {
	title: string
	breadcrumbs: iBreadcrumb[]
	description?: string
	className?: string
}

export const PageCommonInfo: FC<iProps> = ({ title, breadcrumbs, description, className }) => {

	const router = useRouter()

	return (
		<div className={classNames(s.common, { [className || '']: className })}>
			<div className={s.breadcrumbs}>
				{breadcrumbs.map((breadcrumb, idx) => {
					return (
						<div key={idx}>{
							idx !== breadcrumbs.length - 1
								? <div className={s.breadcrumb} onClick={() => router.push(breadcrumb.navigationUrl)}>{breadcrumb.title}<span>/</span></div>
								: <div className={classNames(s.breadcrumb, s.breadcrumb_active)} onClick={() => router.push(breadcrumb.navigationUrl)}>{breadcrumb.title}</div>
						}
						</div>
					)
				})}
			</div>
			{title.length ? <h2 className={s.title}>{title}</h2> : <></>}
			{description && description.length ? <aside className={s.description}>{description}</aside> : <></>}
		</div>
	)
}
