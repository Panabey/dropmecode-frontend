import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import s from './Layout.module.css'

interface iProps {
	children: ReactNode
	className?: string
}

export const Layout: FC<iProps> = ({ children, className }) => {
	return (
		<div className={classNames(s.layout, { [className || '']: className })}>{children}</div>
	)
}
