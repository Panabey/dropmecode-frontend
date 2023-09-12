import classNames from 'classnames'
import s from './HomeSidebarNewsLoader.module.css'

export const HomeSidebarNewsLoader = () => {
	return (
		<>
			<div className={s.link}>
				<div className={s.content}>
					<div className={classNames(s.title, 'loader')}></div>
					<div className={classNames(s.datetime, 'loader')}></div>
				</div>
			</div>
			<hr className={s.block__underline} />
		</>
	)
}
