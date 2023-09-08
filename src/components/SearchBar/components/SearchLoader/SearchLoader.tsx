import classNames from 'classnames'
import s from './SearchLoader.module.css'

export const SearchLoader = () => {
	return (
		<div className={s.results}>
			<div className={s.items}>
				<div className={s.items__block}>
					<div className={s.items__column}>
						{new Array(7).fill(null).map((_, idx) => {
							return (
								<SearchItemLoader key={idx} />
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}


const SearchItemLoader = () => {
	return (
		<div className={s.item}>
			<div className={s.item__row}>
				<div className={s.item__content}>
					<span className={'loader'}></span>
					<aside className={'loader'}></aside>
				</div>
				<div className={s.icons}>
					<div className={classNames(s.icon, 'loader')}></div>
				</div>
			</div>
		</div>
	)
}