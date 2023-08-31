import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import s from './QuizPreview.module.css'
import { UPLOADS_URL } from '@/lib/constants'

export interface iQuizPreview {
	id: number
	title: string
	slug: string
	short_description: string
	logo_url: string
}

export const QuizPreview: FC<iQuizPreview> = ({ title, slug, short_description, logo_url }) => {
	return (
		<div className={s.area}>
			<Link href={slug}>
				<Image src={UPLOADS_URL + logo_url} alt='Картинка квиза' className={s.image} width={600} height={600} />
			</Link>
			<div className={s.info}>
				<h3 className={s.title}>{title}</h3>
				<p className={s.description}>{short_description}</p>
			</div>
			<Link href={slug} className={s.button}>
				Начать квиз
			</Link>
		</div>
	)
}
