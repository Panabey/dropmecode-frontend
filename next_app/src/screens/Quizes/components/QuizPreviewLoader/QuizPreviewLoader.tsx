import classNames from 'classnames'
import s from './QuizPreviewLoader.module.css'

export const QuizPreviewLoader = () => {
	return (
		<div className={s.area}>
			<div className={classNames(s.image, 'loader')}></div>
			<div className={s.info}>
				<div className={classNames(s.title, 'loader')}></div>
				<p className={classNames(s.description, 'loader')}></p>
			</div>
			<div className={classNames(s.button, 'loader')}></div>
		</div>
	)
}
