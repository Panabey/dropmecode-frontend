import classNames from 'classnames';
import { FC, useState } from 'react';
import { IoClose, IoSearch } from 'react-icons/io5';
import s from './SearchBar.module.css';

interface iProps {
	className?: string
}

export const SearchBar: FC<iProps> = ({ className }) => {

	const [searchValue, setSearchValue] = useState<string>('');

	return (
		<div className={classNames(s.search, { [className || '']: className })}>
			{searchValue.length > 0 && <IoClose className={s.icon_clear} fill="#000" size={22} onClick={() => setSearchValue('')} />}
			<IoSearch fill="#000" size={20} />
			<input type="text" className={s.search__input} placeholder='Поиск по разделам...' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
		</div>
	)
}
