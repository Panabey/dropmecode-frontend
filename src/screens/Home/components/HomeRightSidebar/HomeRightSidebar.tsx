import classNames from 'classnames'
import Link from 'next/link'
import { HomeSidebarNews } from '../HomeSidebarNews/HomeSidebarNews'
import s from './HomeRightSidebar.module.css'

export const HomeRightSidebar = () => {
	return (
		<div className={s.sidebar}>
			<div className={s.block}>
				<div className={classNames(s.block__row, s.block__row_title)}>
					<h4 className={s.block__title}>Новости проекта</h4>
					<Link href="/blog" className={s.button__view_all}> Показать все</Link>
				</div>
				<div className={s.block__column}>
					<HomeSidebarNews
						id={1}
						title='Обновлен справочник по Python'
						description='Мы обновили материалы в разделах 1.2 и 1.3'
						createDateTime={'Tue Sep 12 2023 13:19:38 GMT+0300 (Москва, стандартное время)'}
					/>
					<hr className={s.block__underline} />
					<HomeSidebarNews
						id={1}
						title='Обновлен справочник по Javscript'
						description='Мы обновили материалы в разделах 1.2 и 1.3'
						createDateTime={'Tue Sep 12 2023 13:19:38 GMT+0300 (Москва, стандартное время)'}
					/>
					<hr className={s.block__underline} />
					<HomeSidebarNews
						id={1}
						title='Обновление интерфейса сайта'
						description='Мы добавили дополнительные UI элементы'
						createDateTime={'Tue Sep 12 2023 13:19:38 GMT+0300 (Москва, стандартное время)'}
					/>
					<hr className={s.block__underline} />
					<HomeSidebarNews
						id={1}
						title='Исправлены известные ошибки'
						description='На странице темы справочника исправлена ошибка'
						createDateTime={'Tue Sep 12 2023 13:19:38 GMT+0300 (Москва, стандартное время)'}
					/>
					<hr className={s.block__underline} />
					<HomeSidebarNews
						id={1}
						title='Обновлен справочник по Python'
						description='Мы обновили материалы в разделах 1.2 и 1.3'
						createDateTime={'Tue Sep 12 2023 13:19:38 GMT+0300 (Москва, стандартное время)'}
					/>
				</div>
			</div>
		</div>
	)
}
