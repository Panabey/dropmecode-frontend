import { IoSearch } from 'react-icons/io5'
import s from './HomeSearch.module.css'

export const HomeSearch = () => {
	return (
		<div className={s.search}>
			<IoSearch fill="#000" size={20} />
			<input type="text" className={s.search__input} placeholder='Поиск по разделам...' />
		</div>
	)
}
