import classNames from 'classnames'
import s from './QuizQuestionLoader.module.css'

export const QuizQuestionLoader = () => {
	return (
		<div className={s.question}>
			<div className={classNames(s.markdown)}>
				<div className={classNames(s.markdown__title, 'loader')}></div>
				<div className={classNames(s.markdown__code, 'loader')}></div>
				<div className={classNames(s.markdown__description, s.markdown__description_long, 'loader')}></div>
				<div className={classNames(s.markdown__description, s.markdown__description_long, 'loader')}></div>
				<div className={classNames(s.markdown__description, s.markdown__description_middle, 'loader')}></div>
				<div className={classNames(s.markdown__description, s.markdown__description_long, 'loader')}></div>
				<div className={classNames(s.markdown__description, s.markdown__description_small, 'loader')}></div>
				<div className={classNames(s.markdown__description, s.markdown__description_middle, 'loader')}></div>
			</div>
			<div className={s.answers}>
				<aside className={classNames(s.answers__title, 'loader')}></aside>
				<div className={classNames(s.answer)}>
					<div className={classNames(s.answer__title)}>
						<div className={classNames(s.answer__icon, 'loader')}></div>
						<div className={classNames(s.answer__text, 'loader')}></div>
					</div>
					<div className={classNames(s.answer__title)}>
						<div className={classNames(s.answer__icon, 'loader')}></div>
						<div className={classNames(s.answer__text, 'loader')}></div>
					</div>
					<div className={classNames(s.answer__title)}>
						<div className={classNames(s.answer__icon, 'loader')}></div>
						<div className={classNames(s.answer__text, 'loader')}></div>
					</div>
					<div className={classNames(s.answer__title)}>
						<div className={classNames(s.answer__icon, 'loader')}></div>
						<div className={classNames(s.answer__text, 'loader')}></div>
					</div>
				</div>
				<div className={s.buttons}>
					<div className={s.hint__area}>
						<div className={classNames(s.button_hint, 'loader')}></div>
					</div>
					<div className={classNames(s.answers__button, s.answers__button_confirm, 'loader')}></div>
				</div>
			</div>
		</div>
	)
}
