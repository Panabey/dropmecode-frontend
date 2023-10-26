import Image from 'next/image'
import s from './MaintenanceMode.module.css'

export const MaintenanceMode = () => {
	return (
		<div className={s.area}>
			<div className={s.maintenance}>
				<Image width={626} height={626} alt="Картинка ошибки" src='/assets/Error/maintenance.svg' className={s.image} />
				<h2 className={s.title}>Упс. На сервере проводятся технические работы</h2>
				<p className={s.description}>На сервере проекта проводятся технические работы по устранению проблем, либо установки обновления. Пожалуйста посетите страницу позднее</p>
			</div>
		</div>
	)
}
