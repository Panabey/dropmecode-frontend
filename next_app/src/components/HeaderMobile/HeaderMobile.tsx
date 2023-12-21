import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoSearch } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { searchSlice } from '../SearchBar/slices/search.slice';
import s from './HeaderMobile.module.css';

export const HeaderMobile = () => {

	const { pathname } = useRouter();

	const headerRef = useRef<HTMLHeadingElement | null>(null)
	useEffect(() => {
		if (headerRef.current && typeof window !== 'undefined' && window.innerWidth < 768) {
			const rootNode = document.getElementsByTagName('html')
			rootNode[0].style.scrollPaddingTop = headerRef.current.clientHeight + 'px';
		}

		return () => {
			const rootNode = document.getElementsByTagName('html')
			rootNode[0].style.scrollPaddingTop = '0px';
		}
	}, [headerRef])

	const dispatch = useDispatch()
	const { onChangeOpen } = searchSlice.actions

	const [isOpenedBurger, setIsOpenedBurger] = useState<boolean>(false)
	const [isAnimated, setIsAnimated] = useState<boolean>(false)

	useEffect(() => {
		if (!isOpenedBurger) {
			setTimeout(() => {
				setIsAnimated(false)
			}, 300)
		} else {
			setIsAnimated(true)
		}
	}, [isOpenedBurger, setIsAnimated])

	return (
		<>
			<header className={s.header__mobile} ref={headerRef}>
				<div className={s.christmas}></div>
				<div className={s.content}>
					<div className={s.content__row}>
						<Link href='/' className={s.link_logo}>
							<div className={s.logo}>
								<BsBoxSeam size={25} fill="#1F477D" />
								DROPMECODE
								<div className={s.logo__beta}>Бета</div>
							</div>
						</Link>
					</div>
					<div className={s.content__icons}>
						<IoSearch fill="#1F477D" size={22} className={s.icon} onClick={() => dispatch(onChangeOpen(true))} />
						<HiMenuAlt3 fill="#1F477D" size={22} className={s.icon} onClick={() => setIsOpenedBurger((prev) => !prev)} />
					</div>
				</div>
			</header>
			<div className={classNames(s.burger__bg, { [s.opened]: isOpenedBurger }, { [s.hiddened]: !isAnimated })} onClick={() => setIsOpenedBurger(false)}></div>
			<div className={classNames(s.burger, { [s.opened]: isOpenedBurger })}>
				<nav className={s.nav}>
					<div className={s.logo}>
						<BsBoxSeam size={25} fill="#1F477D" />
						DROPMECODE
					</div>
					<ul className={s.menu}>
						<Link href='/langs'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/langs') })}>Справочники</li></Link>
						<Link href='/articles'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/articles') })}>Статьи</li></Link>
						<Link href='/blog'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/blog') })}>Блог</li></Link>
						<Link href='/quizes'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/quizes') })}> Квизы</li></Link>
						<Link href='/help'><li className={classNames(s.menu__item, { [s.menu__item_active]: pathname.startsWith('/help') })}>Помощь</li></Link>
					</ul>
				</nav>
				<div className={s.menu__row}>
					<Link href="https://github.com/Panabey" className={s.link}>
						Github: <FaGithub fill="#000" size={20} className={classNames(s.menu__item, s.menu__icon)} />
					</Link>
					<Link href="https://vk.com/dropmecode" target="_blank" className={s.link}>
						VK: <Image width={20} height={20} alt='SVG VK' src='/assets/Header/vk1.svg' className={classNames(s.menu__item, s.menu__icon)} />
					</Link>
				</div>
			</div>
		</>
	)
}
