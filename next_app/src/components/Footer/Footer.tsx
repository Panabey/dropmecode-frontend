import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import s from './Footer.module.css'
import { goosePhrases } from './utils/goose'

export const Footer = () => {

	const [gooseIsVisible, setGooseIsVisible] = useState<boolean>(false)
	const [gooseIsAnimated, setGooseIsAnimated] = useState<boolean>(false)
	const [gooseMessage, setGooseMessage] = useState<string>(goosePhrases[0].text)
	const [actions, setActions] = useState<typeof goosePhrases>(goosePhrases);

	function onClickGoose() {
		if (actions.length === 0) {
			return;
		}
		setGooseIsVisible(true)
		setTimeout(() => {
			setGooseIsAnimated(true)
		}, 300)
		const randomIdx = Math.floor(Math.random() * actions.length);
		const action = actions[randomIdx];
		action.callback()
		setGooseMessage(action.text)
		setActions((prev) => prev.filter((_, idx) => idx !== randomIdx))

		setTimeout(() => {
			setGooseIsAnimated(false)
		}, 2700)
		setTimeout(() => {
			setGooseIsVisible(false)
		}, 3000)
	}

	return (
		<>
			<footer className={s.footer}>
				<div className={classNames(s.goose, { [s.visible]: gooseIsVisible }, { [s.animated]: gooseIsAnimated })} onClick={onClickGoose}>
					<div className={s.message}>
						{gooseMessage}
					</div>
					<Image width={512} height={512} alt='Важный гусь' src={'/assets/Goose/goose.png'} />
					<Image className={classNames('hidden', 'goose2')} width={512} height={512} alt='Важный гусь' src={'/assets/Goose/goose2.png'} style={{ pointerEvents: 'none' }} />
				</div>
				<div className={s.container}>
					<div></div>
					<div className={s.area}>
						<div className={classNames(s.row)}>
							<aside>Мы в соцсетях:</aside>
							<div className={s.row}>
								<Link href="https://github.com/Panabey">
									<FaGithub fill="#000" size={20} className={s.icon} />
								</Link>
								<Link href="https://vk.com/dropmecode" target="_blank">
									<Image width={20} height={20} alt='SVG VK' src='/assets/Header/vk1.svg' className={s.icon} />
								</Link>
							</div>
						</div>
						<div className={classNames(s.row, s.row__copyright)}>
							<aside>&copy; DropMeCode 2023. Все права защищены.</aside>
						</div>
						<div className={classNames(s.row, s.row__buttons)}>
							<Link href="/confidentiality"><button className={s.button}>Политика конфиденциальности</button></Link>
							<button className={s.button}>Условия пользования</button>
						</div>
					</div>
					<div></div>
				</div>
			</footer>
		</>
	)
}
