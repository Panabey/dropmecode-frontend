import classNames from 'classnames'
import { AiOutlineHome } from 'react-icons/ai'
import { HiCode, HiMenuAlt1 } from 'react-icons/hi'
import { ImDropbox, ImNewspaper } from 'react-icons/im'
import { IoMdHelp } from 'react-icons/io'
import s from './SidebarMenu.module.css'

export const SidebarMenu = () => {
	return (
		<div className={s.sidebar}>
			<div className={s.content}>
				<div className={s.logo}>
					<ImDropbox size={42} fill="#1F477D" />
					DROPMECODE
				</div>
				<nav className={s.nav}>
					<ul className={s.menu}>
						<li className={classNames(s.menu__item, s.menu__item_active)}><AiOutlineHome size={24} fill="#1DC989" /> Главная</li>
						<li className={s.menu__item}><HiCode size={24} fill="#1DC989" /> Языки программирования</li>
						<li className={s.menu__item}><ImNewspaper size={24} fill="#1DC989" /> Новости</li>
						<li className={s.menu__item}><HiMenuAlt1 size={24} fill="#1DC989" /> Блог</li>
						<hr className={s.menu__underline} />
						<li className={s.menu__item}><IoMdHelp size={24} fill="#1DC989" /> Помощь</li>
						<div className={s.menu__buttons}>
							<button className={s.menu__button}>Связь с авторами</button>
							<button className={s.menu__button}>Правила пользования</button>
							<button className={s.menu__button}>Оферта</button>
						</div>
					</ul>
				</nav>
			</div>
			<footer className={s.footer}>&copy; DropMeCode 2023. Все права защищены</footer>
		</div>
	)
}
