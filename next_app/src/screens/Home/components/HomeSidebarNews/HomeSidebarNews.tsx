import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import getSlug from 'speakingurl'
import s from './HomeSidebarNews.module.css'

interface iProps {
	id: number
	title: string
	imageUrl?: string
	createDateTime: string
}

export const HomeSidebarNews: FC<iProps> = ({ id, title, imageUrl, createDateTime }) => {

	return (
		<>
			<Link href={`/blog/${id}-${getSlug(title, { lang: 'ru' })}`} className={s.link}>
				{imageUrl ? <Image width={512} height={512} alt="Картинка новости из блога" src={imageUrl} className={s.icon} /> : <></>}
				<div className={s.content}>
					<h5 className={s.title}>{title}</h5>
					<span className={s.datetime}>{new Date(createDateTime).toLocaleString().slice(0, -3)}</span>
				</div>
			</Link>
			<hr className={s.block__underline} />
		</>
	)
}
