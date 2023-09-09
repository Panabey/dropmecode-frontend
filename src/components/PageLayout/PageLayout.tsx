import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import { Header } from '../Header/Header'
import { Layout } from '../Layout/Layout'
import s from './PageLayout.module.css'
import { Footer } from '../Footer/Footer'

interface iProps {
	children: ReactNode
	className?: string
	disableFooter?: boolean
}

export const PageLayout: FC<iProps> = ({ children, className, disableFooter }) => {
	return (
		<>
			<Header />
			<Layout className={classNames(s.Layout, { [className || '']: className })}>
				{children}
				{!disableFooter ? <Footer /> : <></>}
			</Layout>
		</>
	)
}
