import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import s from './PageArea.module.css'

interface iProps {
	children: ReactNode
	className?: string
}

export const PageArea: FC<iProps> = ({ children, className }) => {
	return (
		<div className={classNames(s.area, { [className || '']: className })}>
			{children}
		</div>
	)
}
