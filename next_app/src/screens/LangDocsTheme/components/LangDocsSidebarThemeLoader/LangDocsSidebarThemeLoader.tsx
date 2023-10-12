import classNames from 'classnames'
import s from './LangDocsSidebarThemeLoader.module.css'

export const LangDocsSidebarThemeLoader = () => {
	return (
		<div className={s.block}>
			<h4 className={classNames(s.block__title, 'loader')}></h4>
			{
				new Array(7).fill(null).map((_, idx) => {
					return (
						<div className={s.block__column} key={idx}>

							<div className={s.tree__section}>
								<div className={classNames(s.tree__part, 'loader')}></div>
								<div className={s.tree__links}>
									{
										new Array(5).fill(null).map((__, idx1) => {
											return (
												<div
													className={classNames(s.tree__link, 'loader')}
													key={idx1}
												>
												</div>
											)
										})
									}
								</div>
							</div>

						</div>
					)
				})
			}
		</div>
	)
}
