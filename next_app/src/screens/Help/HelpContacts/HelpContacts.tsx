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
					<Link href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</Link>
				</div>
				<div className={s.contacts__method}>
					<Image width={32} height={32} alt='SVG VK' src='/assets/Help/vk_1.png' className={s.contacts__icon} />
					<aside className={s.contacts__text}>Напишите лично в VK: </aside>
					<Link href='https://vk.com/dropmecode'>https://vk.com/dropmecode</Link>
				</div>
				<div className={s.contacts__method}>
					<Image width={32} height={32} alt='SVG VK' src='/assets/Help/github.png' className={s.contacts__icon} />
					<aside className={s.contacts__text}>Мы на Github: </aside>
					<Link href='https://github.com/Panabey'>https://github.com/Panabey</Link>
				</div>
			</div>
		</div>
	)
}
