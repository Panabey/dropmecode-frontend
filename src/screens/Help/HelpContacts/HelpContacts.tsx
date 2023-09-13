import Image from 'next/image'
import Link from 'next/link'
import { GoMail } from 'react-icons/go'
import s from './HelpContacts.module.css'

export const HelpContacts = () => {
	return (
		<div className={s.contacts}>
			<h3 className={s.contacts__title}>Хотите связаться с нами?</h3>
			<h4 className={s.contacts__subtitle}>Вы можете сделать это любым из описанных ниже способов</h4>
			<div className={s.methods}>
				<div className={s.contacts__method}>
					<GoMail size={32} color="#1F477D" className={s.contacts__icon} />
					<aside className={s.contacts__text}>Напишите нам на почту: </aside>
					<Link href='mailto:test@test.ru'>test@test.ru</Link>
				</div>
				<div className={s.contacts__method}>
					<Image width={32} height={32} alt='SVG VK' src='/assets/Help/vk_1.png' className={s.contacts__icon} />
					<aside className={s.contacts__text}>Напишите лично в VK: </aside>
					<Link href='https://vk.com/test'>https://vk.com/test</Link>
				</div>
				<div className={s.contacts__method}>
					<Image width={32} height={32} alt='SVG VK' src='/assets/Help/github.png' className={s.contacts__icon} />
					<aside className={s.contacts__text}>Свяжитель через Github: </aside>
					<Link href='https://github.com/kuligin'>https://github.com/kuligin</Link>
				</div>
			</div>
		</div>
	)
}
