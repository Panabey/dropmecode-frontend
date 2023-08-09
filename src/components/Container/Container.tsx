import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import s from './Container.module.css'

interface iProps {
	children: ReactNode
	className?: string
}

export const Container: FC<iProps> = ({ children, className }) => {
	return (
		<div className={classNames(s.container, { [className || '']: className })}>{children}</div>
	)
}
