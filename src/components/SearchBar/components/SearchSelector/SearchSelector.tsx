import classNames from 'classnames'
import { FC } from 'react'
import s from './SearchSelector.module.css'

interface iProps {
	selectedFilter: 'langs' | 'quizes' | 'articles'
	onChangeFilter: (newFilter: iProps['selectedFilter']) => void
}

export const SearchSelector: FC<iProps> = ({ onChangeFilter, selectedFilter }) => {
	return (
		<div className={s.selector}>
			<div className={s.selector__row}>
				<h3 className={s.selector__title}>Поиск по:</h3>
				<button
					className={classNames(s.selector__button, { [s.selector__button_active]: selectedFilter === 'langs' })}
					onClick={() => onChangeFilter('langs')}
				>
					Справочникам
				</button>
				<button
					className={classNames(s.selector__button, { [s.selector__button_active]: selectedFilter === 'articles' })}
					onClick={() => onChangeFilter('articles')}
				>Статьям
				</button>
				<button
					className={classNames(s.selector__button, { [s.selector__button_active]: selectedFilter === 'quizes' })}
					onClick={() => onChangeFilter('quizes')}
				>
					Квизам
				</button>
			</div>
			<hr className={s.selector__underline} />
		</div>
	)
}
