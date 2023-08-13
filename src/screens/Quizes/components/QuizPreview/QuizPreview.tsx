import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import s from './QuizPreview.module.css'

export interface iQuizPreview {
	id: number
	title: string
	slug: string
	description: string
	imageUrl: string
}

export const QuizPreview: FC<iQuizPreview> = ({ id, title, slug, description, imageUrl }) => {
	return (
		<div className={s.area}>
			<Link href={'/quizes/' + id + '-' + slug}>
				<Image src={imageUrl} alt='Картинка квиза' className={s.image} width={600} height={600} />
			</Link>
			<div className={s.info}>
				<h3 className={s.title}>{title}</h3>
				<p className={s.description}>{description}</p>
			</div>
			<Link href={'/quizes/' + id + '-' + slug} className={s.button}>
				Начать квиз
			</Link>
		</div>
	)
}
