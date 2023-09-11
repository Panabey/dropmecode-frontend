import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import { FaGithub } from 'react-icons/fa'
import { SearchBar } from '../SearchBar/SearchBar'
import s from './Header.module.css'

export const Header = () => {

	const { pathname } = useRouter();

	const headerRef = useRef<HTMLHeadingElement | null>(null)
	useEffect(() => {
		if (headerRef.current) {
			const rootNode = document.getElementsByTagName('html')
			rootNode[0].style.scrollPaddingTop = headerRef.current.clientHeight + 'px';
		}

		return () => {
			const rootNode = document.getElementsByTagName('html')
			rootNode[0].style.scrollPaddingTop = '0px';
		}
	}, [headerRef])

	return (
		<header className={classNames(s.header, 'header')} ref={headerRef}>
			<div></div>
			<div className={s.content}>
				<div className={s.content__row}>
					<Link href='/' className={s.link_logo}>
						<div className={s.logo}>
							<BsBoxSeam size={25} fill="#1F477D" />
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
						<Link href='/articles'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/articles') })}>Статьи</li></Link>
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
			<div></div>
		</header>
	)
}
