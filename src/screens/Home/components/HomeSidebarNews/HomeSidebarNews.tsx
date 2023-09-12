import { splitText } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import getSlug from 'speakingurl'
import s from './HomeSidebarNews.module.css'

interface iProps {
	id: number
	title: string
	description: string
	imageUrl?: string
	createDateTime: string
}

export const HomeSidebarNews: FC<iProps> = ({ id, title, description, imageUrl, createDateTime }) => {

	return (
		<Link href={`/news/${id}-${getSlug(title, { lang: 'ru' })}`} className={s.link}>
			{imageUrl ? <Image width={512} height={512} alt="Картинка новости из блога" src={imageUrl} className={s.icon} /> : <></>}
			<div className={s.content}>
				<h5 className={s.title}>{title}</h5>
				<p className={s.description}>{splitText(description, 45) + '...'}</p>
				<span className={s.datetime}>{new Date(createDateTime).toLocaleString().slice(0, -3)}</span>
			</div>
		</Link>
	)
}
