import classNames from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import s from './ArticlesListPreview.module.css'

interface iProps {
	slug: string
	title: string
	description: string
	dateTime: string
	imageUrl?: string
	tags?: string[]
}

export const ArticlesListPreview: FC<iProps> = ({ slug, title, description, dateTime, imageUrl, tags }) => {
	return (
		<div className={classNames(s.area, { [s.area_noimg]: !imageUrl })}>
			{imageUrl && <Link href={'/news/' + slug}><img src={imageUrl} alt="Картинка новости" className={s.image} /></Link>}
			<div className={s.info}>
				<Link href={'/news/' + slug}><h3 className={s.info__title}>{title}</h3></Link>
				<div className={s.info__meta}>
					<span className={s.info__date}>{dateTime}</span>
					{tags && tags.length && <div className={s.info__tags}>{tags.map((tag, idx) => {
						return (
							<span className={s.info__tag} key={idx}>{tag}</span>
						)
					})}</div>}
				</div>
				<p className={s.info__description}>{description}</p>
			</div>
		</div>
	)
}
