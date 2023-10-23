import { UPLOADS_URL } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import s from './LangDocsSidebarBook.module.css'

interface iProps {
	title: string
	author: string
	imageUrl?: string
}

export const LangDocsSidebarBook: FC<iProps> = ({ title, author, imageUrl }) => {
	return (
		<>
			<Link href={`link`} className={s.link}>
				{imageUrl ? <Image width={512} height={512} alt="Картинка материала" src={UPLOADS_URL + imageUrl} className={s.icon} /> : <></>}
				<div className={s.content}>
					<h5 className={s.title}>{title}</h5>
					<span className={s.datetime}>{author}</span>
				</div>
			</Link>
			<hr className={s.block__underline} />
		</>
	)
}
