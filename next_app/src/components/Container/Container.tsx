import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import s from './Container.module.css'

interface iProps {
	children: ReactNode
	className?: string
	noMarginLeft?: boolean
}

export const Container: FC<iProps> = ({ children, className, noMarginLeft }) => {
	return (
		<div className={classNames(s.container, { [className || '']: className }, { [s.noMarginLeft]: noMarginLeft })}>{children}</div>
	)
}
