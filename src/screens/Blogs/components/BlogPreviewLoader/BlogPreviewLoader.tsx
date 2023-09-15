import classNames from 'classnames'
import s from './BlogPreviewLoader.module.css'

export const BlogPreviewLoader = () => {
	return (

		<div className={s.area}>
			<div className={s.info}>
				<h3 className={classNames(s.info__title, 'loader')}></h3>
				<div className={s.info__meta}>
					<span className={classNames(s.info__date, 'loader')}></span>
					<div className={s.metainfo__row}>
						<span className={classNames(s.metainfo__label, 'loader')}></span>
						<aside className={classNames(s.metainfo__datetime, 'loader')}></aside>
					</div>
				</div>
			</div>
			<div className={classNames(s.arrow, 'loader')} />
		</div>
	)
}
