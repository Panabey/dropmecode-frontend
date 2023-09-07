import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import { Header } from '../Header/Header'
import { Layout } from '../Layout/Layout'
import s from './PageLayout.module.css'

interface iProps {
	children: ReactNode
	className?: string
}

export const PageLayout: FC<iProps> = ({ children, className }) => {
	return (
		<>
			<Header />
			<Layout className={classNames(s.Layout, { [className || '']: className })}>
				{children}
			</Layout>
		</>
	)
}
