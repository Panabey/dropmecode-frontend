import classNames from 'classnames'
import s from './PageArea.module.css'
import {FC, ReactNode} from 'react'

interface iProps{
	children: ReactNode
	className?: string
}

export const PageArea:FC<iProps> = ({children, className}) => {
  return (
	<div className={classNames(s.area, {[className || '']: className})}>
		{children}
	</div>
  )
}
