import { HiCode, HiMenuAlt1 } from 'react-icons/hi'
import { ImNewspaper } from 'react-icons/im'
import { RiCheckboxMultipleLine } from 'react-icons/ri'
import { HomePartition } from '../HomePartition/HomePartition'
import s from './HomeInfo.module.css'

export const HomeInfo = () => {
	return (
		<main className={s.main}>
			<h2 className={s.main__title}>Путеводитель по DropMeCode</h2>
			<h4 className={s.main__subtitle}>Приветствуем в мире DropMeCode! Перейдите в необходимый раздел и изучите что-то новое для себя уже сейчас!</h4>
			<div className={s.partitions}>
				<HomePartition navigationUrl='/langs' title="Языки программирования" description='У нас имеется качественная, увлекательная и бесплатная программа обучения популярным языкам программирования'>
					<HiCode size={40} />
				</HomePartition>
				<HomePartition navigationUrl='/news' title="Новости" description='Горячие новости из мира IT доступным языком. Наша команда тщательно отбирает материал, чтобы он был Вам интересен'>
					<ImNewspaper size={40} />
				</HomePartition>
				<HomePartition navigationUrl='/blog' title="Блог" description='В данном разделе мы сообщаем о всех обновлениях сайта, а также время технических работ'>
					<HiMenuAlt1 size={40} />
				</HomePartition>
				<HomePartition navigationUrl='/quizes' title="Квизы" description='Хотите проверить свои знания в языках программирования? Наши квиз-тесты помогут вам определить уровень знаний'>
					<RiCheckboxMultipleLine size={40} />
				</HomePartition>
			</div>
		</main>
	)
}
