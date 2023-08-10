import classNames from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import s from './PartitionInfo.module.css'

export interface iLink {
	partnumber: string
	title: string
	navigationUrl: string
}

interface iProps {
	title: string
	description: string
	partNumber?: number
	links?: iLink[]
	className?: string
}

export const PartitionInfo: FC<iProps> = ({ partNumber, title, description, links, className }) => {
	return (
		<div className={classNames(s.info, { [className || '']: className })}>
			<div className={s.info__contents}>
				<div className={s.contents__title}>
					{partNumber && <span className={s.partnumber}>{partNumber}</span>}
					<h3 className={s.title}>{title}</h3>
				</div>
				<p className={s.description}>{description}</p>
			</div>
			{links && links.length &&
				<div className={s.links}>
					{links.map((link, idx) => {
						return (
							<div className={s.link} key={idx}>
								<span className={s.link__partnumber}>{link.partnumber}</span>
								<Link href={link.navigationUrl}>{link.title}</Link>
							</div>
						)
					})}
				</div>
			}
		</div>
	)
}
