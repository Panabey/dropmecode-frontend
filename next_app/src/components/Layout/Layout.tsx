import { useHeaderHeight } from '@/hooks/useHeaderHeight'
import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import s from './Layout.module.css'

interface iProps {
	children: ReactNode
	className?: string
}

export const Layout: FC<iProps> = ({ children, className }) => {

	const headerHeight = useHeaderHeight()

	return (
		<div className={classNames(s.layout, { [className || '']: className })} style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>{children}</div>
	)
}
