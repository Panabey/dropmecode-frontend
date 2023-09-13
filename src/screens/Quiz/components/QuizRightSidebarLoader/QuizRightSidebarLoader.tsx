import classNames from 'classnames'
import s from './QuizRightSidebarLoader.module.css'

export const QuizRightSidebarLoader = () => {
  return (
	<div className={classNames(s.title, 'loader')}></div>
  )
}
