import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import { Layout } from '../Layout/Layout'
import { SidebarMenu } from '../SidebarMenu/SidebarMenu'
import s from './PageLayout.module.css'

interface iProps {
	children: ReactNode
	className?: string
}

export const PageLayout: FC<iProps> = ({ children, className }) => {
	return (
		<>
			<SidebarMenu />
			<Layout className={classNames(s.Layout, { [className || '']: className })}>
				{children}
			</Layout>
		</>
	)
}
