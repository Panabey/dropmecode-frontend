import { LiaCoinsSolid } from 'react-icons/lia'
import { MdCastForEducation, MdOutlineArticle, MdOutlineLightbulb, MdOutlineQuiz } from 'react-icons/md'
import { SiMoleculer } from 'react-icons/si'
import s from './HomeAboutDetails.module.css'

export const HomeAboutDetails = () => {
	return (
		<div className={s.details}>
			<div className={s.details__content}>
				<h3 className={s.details__title}>Зачем Вы здесь?</h3>
				<h4 className={s.details__subtitle}>Оставайтесь с нами, если вы хотите</h4>
			</div>
			<div className={s.details__blocks}>
				<div className={s.block}>
					<MdCastForEducation fill="#1F477D" size={35} />
					<aside>Подтянуть свои знания</aside>
				</div>
				<div className={s.block}>
					<MdOutlineQuiz fill="#1F477D" size={35} />
					<aside>Пройти увлекательные квизы</aside>
				</div>
				<div className={s.block}>
					<MdOutlineArticle fill="#1F477D" size={35} />
					<aside>Прочитать интересные статьи</aside>
				</div>
				<div className={s.block}>
					<SiMoleculer fill="#1F477D" size={35} />
					<aside>Изучить что-то новое</aside>
				</div>
				<div className={s.block}>
					<MdOutlineLightbulb fill="#1F477D" size={35} />
					<aside>Вдохновиться новыми идеями</aside>
				</div>
				<div className={s.block}>
					<LiaCoinsSolid fill="#1F477D" size={35} />
					<aside>Устали от подписок на всё</aside>
				</div>
			</div>
		</div>
	)
}
