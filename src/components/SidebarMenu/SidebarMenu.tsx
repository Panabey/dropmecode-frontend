import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineHome } from 'react-icons/ai'
import { HiCode, HiMenuAlt1 } from 'react-icons/hi'
import { ImDropbox, ImNewspaper } from 'react-icons/im'
import { IoMdHelp } from 'react-icons/io'
import { RiCheckboxMultipleLine } from 'react-icons/ri'
import s from './SidebarMenu.module.css'

export const SidebarMenu = () => {

	const { pathname } = useRouter();

	return (
		<div className={s.sidebar}>
			<div className={s.content}>
				<div className={s.logo}>
					<ImDropbox size={42} fill="#1F477D" />
					DROPMECODE
				</div>
				<nav className={s.nav}>
					<ul className={s.menu}>
						<Link href='/'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname === '/' })}><AiOutlineHome size={24} fill="#1DC989" /> Главная</li></Link>
						<Link href='/langs'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/langs') })}><HiCode size={24} fill="#1DC989" /> Языки программирования</li></Link>
						<Link href='/news'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/news') })}><ImNewspaper size={24} fill="#1DC989" /> Новости</li></Link>
						<Link href='/blog'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/blog') })}><HiMenuAlt1 size={24} fill="#1DC989" /> Блог</li></Link>
						<Link href='/quizes'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/blog') })}><RiCheckboxMultipleLine size={24} fill="#1DC989" /> Квизы</li></Link>
						<hr className={s.menu__underline} />
						<Link href='/help'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/quizes') })}><IoMdHelp size={24} fill="#1DC989" /> Помощь</li></Link>
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
