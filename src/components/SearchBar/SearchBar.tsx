import classNames from 'classnames';
import { FC } from 'react';
import { IoSearch } from 'react-icons/io5';
import s from './SearchBar.module.css';

interface iProps {
	className?: string
}

export const SearchBar: FC<iProps> = ({ className }) => {

	//const [searchValue, setSearchValue] = useState<string>('');

	return (
		<div className={classNames(s.search, { [className || '']: className })}>
			{/* {searchValue.length > 0 && <IoClose className={s.icon_clear} fill="#000" size={22} onClick={() => setSearchValue('')} />} */}
			<IoSearch fill="#000" size={35} />
			<span className={s.search__input}>Поиск...</span>
			<span className={s.search__hotkey}>CTRL + <aside>K</aside> </span>
		</div>
	)
}
