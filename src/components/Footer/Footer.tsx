import classNames from 'classnames'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import s from './Footer.module.css'

export const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.container}>
				<div className={classNames(s.row)}>
					<aside>Мы в соцсетях:</aside>
					<div className={s.row}>
						<FaGithub fill="#000" size={20} className={s.icon} />
						<Image width={20} height={20} alt='SVG VK' src='/assets/Header/vk1.svg' className={s.icon} />
					</div>
				</div>
				<div className={classNames(s.row, s.row__copyright)}>
					<aside>&copy; DropMeCode 2023. Все права защищены.</aside>
				</div>
				<div className={s.row}>
					<button className={s.button}>Политика конфиденциальности</button>
					<button className={s.button}>Условия пользования</button>
				</div>
			</div>
		</footer>
	)
}
