import { useState } from 'react';
import { IoClose, IoSearch } from 'react-icons/io5';
import s from './SearchBar.module.css';

export const SearchBar = () => {

	const [searchValue, setSearchValue] = useState<string>('');

	return (
		<div className={s.search}>
			{searchValue.length > 0 && <IoClose className={s.icon_clear} fill="#000" size={22} onClick={() => setSearchValue('')} />}
			<IoSearch fill="#000" size={20} />
			<input type="text" className={s.search__input} placeholder='Поиск по разделам...' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
		</div>
	)
}
