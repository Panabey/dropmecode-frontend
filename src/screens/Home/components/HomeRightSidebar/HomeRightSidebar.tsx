import { HomeSidebarNews } from '../HomeSidebarNews/HomeSidebarNews'
import s from './HomeRightSidebar.module.css'

export const HomeRightSidebar = () => {
	return (
		<div className={s.sidebar}>
			<div className={s.block}>
				<h4 className={s.block__title}>Новости проекта</h4>
				<div className={s.block__column}>
					<HomeSidebarNews
						id={1}
						title='Обновлен справочник по Python'
						description='Мы обновили материалы в разделах 1.2 и 1.3...'
						imageUrl='/assets/Home/settings.png'
						createDateTime={new Date().toString()}
					/>
					<hr className={s.block__underline} />
					<HomeSidebarNews
						id={1}
						title='Обновлен справочник по Javscript'
						description='Мы обновили материалы в разделах 1.2 и 1.3...'
						imageUrl='/assets/Home/update.png'
						createDateTime={new Date().toString()}
					/>
					<hr className={s.block__underline} />
					<HomeSidebarNews
						id={1}
						title='Обновление интерфейса сайта'
						description='Мы добавили дополнительные UI элементы...'
						createDateTime={new Date().toString()}
					/>
					<hr className={s.block__underline} />
					<HomeSidebarNews
						id={1}
						title='Исправлены известные ошибки'
						description='На странице темы справочника исправлена ошибка...'
						createDateTime={new Date().toString()}
					/>
					<hr className={s.block__underline} />
					<HomeSidebarNews
						id={1}
						title='Обновлен справочник по Python'
						description='Мы обновили материалы в разделах 1.2 и 1.3...'
						imageUrl='/assets/Home/update.png'
						createDateTime={new Date().toString()}
					/>
				</div>
			</div>
		</div>
	)
}
