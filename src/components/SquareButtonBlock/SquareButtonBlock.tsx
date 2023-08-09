import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'
import s from './SquareButtonBlock.module.css'

interface iProps {
	imageUrl: string
	navigationUrl: string
	title: string
	className?: string
	labelTitle?: string
	labelColor?: string
	labelBgColor?: string
}

export const SquareButtonBlock: FC<iProps> = ({ imageUrl, navigationUrl, title, className, labelTitle, labelColor, labelBgColor }) => {

	const router = useRouter()

	return (
		<div className={classNames(s.square, { [className || '']: className })} onClick={() => router.push(navigationUrl)}>
			{labelTitle && <span className={s.label} style={{ color: labelColor ? labelColor : '#5573F3', backgroundColor: labelBgColor ? labelBgColor : "#E2E8FF" }}>{labelTitle}</span>}
			<img src={imageUrl} alt="Картинка блока" />
			<h3 className={s.title}>{title}</h3>
		</div>
	)
}
