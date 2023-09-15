import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { HeaderMobile } from '../HeaderMobile/HeaderMobile'
import { Layout } from '../Layout/Layout'
import s from './PageLayout.module.css'

interface iProps {
	children: ReactNode
	className?: string
	disableFooter?: boolean
}

export const PageLayout: FC<iProps> = ({ children, className, disableFooter }) => {
	return (
		<>
			<HeaderMobile />
			<Header />
			<Layout className={classNames(s.Layout, { [className || '']: className })}>
				{children}
				{!disableFooter ? <Footer /> : <></>}
			</Layout>
		</>
	)
}
