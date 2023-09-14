import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineRead } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import s from './BlogPreview.module.css'

interface iProps {
	slug: string
	title: string
	dateTime: string
	reading_time: number
}

export const BlogPreview: FC<iProps> = ({ slug, title, dateTime, reading_time }) => {
	return (
		<Link href={slug} className={s.link}>
			<div className={s.area}>
				<div className={s.info}>
					<h3 className={s.info__title}>{title}</h3>
					<div className={s.info__meta}>
						<span className={s.info__date}>{new Date(dateTime).toLocaleString().slice(0, -3)}</span>
						<div className={s.metainfo__row}>
							<span className={s.metainfo__label}><AiOutlineRead fill="#888" size={18} /></span>
							<aside className={s.metainfo__datetime}> {reading_time} мин. на чтение</aside>
						</div>
					</div>
				</div>
				<IoIosArrowForward fill="#1F477D" className={s.arrow} size={30} />
			</div>
		</Link>
	)
}
