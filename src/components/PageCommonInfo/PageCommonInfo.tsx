import { splitText } from '@/lib/utils'
import classNames from 'classnames'
import Link from 'next/link'
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
								? <Link className={s.breadcrumb} href={breadcrumb.navigationUrl}>{splitText(breadcrumb.title, 60, '...')}<span>/</span></Link>
								: <div className={classNames(s.breadcrumb, s.breadcrumb_active)} onClick={() => router.push(breadcrumb.navigationUrl)}>{splitText(breadcrumb.title, 60, '...')}</div>
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
