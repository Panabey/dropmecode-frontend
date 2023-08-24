import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'
import { ImDropbox } from 'react-icons/im'
import { SearchBar } from '../SearchBar/SearchBar'
import s from './SidebarMenu.module.css'

export const SidebarMenu = () => {

	const { pathname } = useRouter();

	return (
		<div className={s.sidebar}>
			<div className={s.content}>
				<div className={s.content__row}>
					<Link href='/' className={s.link_logo}>
						<div className={s.logo}>
							<ImDropbox size={25} fill="#1F477D" />
							DROPMECODE
						</div>
					</Link>
					<div className={s.searchbar}>
						<SearchBar />
					</div>
				</div>
				<nav className={s.nav}>
					<ul className={s.menu}>
						<Link href='/langs'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/langs') })}>Справочники</li></Link>
						<Link href='/news'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/news') })}>Новости</li></Link>
						<Link href='/blog'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/blog') })}>Блог</li></Link>
						<Link href='/quizes'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/quizes') })}> Квизы</li></Link>
						<Link href='/help'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/help') })}>Помощь</li></Link>
						<div className={s.menu__row}>
							<div className={s.menu__upperline}></div>
							<FaGithub fill="#000" size={20} className={classNames(s.menu__item, s.menu__icon)} />
							<Image width={20} height={20} alt='SVG VK' src='/assets/Header/vk1.svg' className={classNames(s.menu__item, s.menu__icon)} />
						</div>
					</ul>
				</nav>
			</div>
		</div>
	)
}
