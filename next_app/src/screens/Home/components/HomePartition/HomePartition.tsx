import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import s from './HomePartition.module.css'

interface iProps {
	children: ReactNode
	title: string
	description: string
	navigationUrl: string
}

export const HomePartition: FC<iProps> = ({ children, title, description, navigationUrl }) => {

	const router = useRouter()

	return (
		<div className={s.area} onClick={() => router.push(navigationUrl)}>
			<div className={s.icon}>
				{children}
			</div>
			<div className={s.content}>
				<h3 className={s.content__title}>{title}</h3>
				<p className={s.content__description}>{description}</p>
			</div>
		</div>
	)
}
