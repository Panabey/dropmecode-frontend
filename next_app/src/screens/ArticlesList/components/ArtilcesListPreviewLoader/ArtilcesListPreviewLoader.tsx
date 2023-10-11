import classNames from 'classnames'
import s from './ArtilcesListPreviewLoader.module.css'

export const ArtilcesListPreviewLoader = () => {
	return (
		<div className={classNames(s.area)}>
			<div className={classNames(s.image, 'loader')} />
			<div className={s.info}>
				<h3 className={classNames(s.info__title, 'loader')}></h3>
				<div className={s.info__meta}>
					<div className={classNames(s.info__date, 'loader')} />
					<div className={s.info__tags}>
						<div className={classNames(s.info__tag, 'loader')}></div>
						<div className={classNames(s.info__tag, 'loader')}></div>
						<div className={classNames(s.info__tag, 'loader')}></div>
					</div>
				</div>
				<p className={classNames(s.info__description, 'loader')}></p>
				<p className={classNames(s.info__description, 'loader')}></p>
				<p className={classNames(s.info__description, 'loader')}></p>
			</div>
		</div>
	)
}
