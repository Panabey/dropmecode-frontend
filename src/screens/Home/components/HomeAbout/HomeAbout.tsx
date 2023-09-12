import Image from 'next/image'
import s from './HomeAbout.module.css'

export const HomeAbout = () => {
	return (
		<div className={s.about}>
			<div className={s.about__content}>
				<h3 className={s.about__title}>Кто мы?</h3>
				<h4 className={s.about__subtitle}>Мы - небольшая команда разработчиков, увлечённых общим делом!</h4>
				<p className={s.about__description}>Как и Вы, гость нашего сайта, мы являемся разработчиками с некоторым набором знаний и навыков, которые
					хотим передать вам. Стараемся донести до вас материал с интересной подачей, чтобы вы не успели заскучать
					при его прочтении, а также создаем для Вас познавательные квизы, где вы сможете закрепить изученное. </p>
			</div>
			<Image alt="Картинка - кто мы?" width={512} height={512} src='/assets/Home/about.svg' className={s.about__img} />
		</div>
	)
}
