import classNames from 'classnames'
import { QuizPreviewLoader } from '../QuizPreviewLoader/QuizPreviewLoader'
import s from './QuizesTopicLoader.module.css'

export const QuizesTopicLoader = () => {
	return (
		<section className={s.section}>
			<div className={s.section__row}>
				<div className={classNames(s.section__title, 'loader')}></div>
				<div className={classNames(s.section__details, 'loader')}></div>
			</div>
			<div className={s.quizes}>
				<QuizPreviewLoader />
				<QuizPreviewLoader />
				<QuizPreviewLoader />
			</div>
		</section>
	)
}
