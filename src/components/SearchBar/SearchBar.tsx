import { useTypedSelector } from '@/redux/store';
import classNames from 'classnames';
import { FC } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import s from './SearchBar.module.css';
import { SearchModal } from './components/SearchModal/SearchModal';
import { searchSlice } from './slices/search.slice';

interface iProps {
	className?: string
}

export const SearchBar: FC<iProps> = ({ className }) => {

	const isOpenedModal = useTypedSelector((state) => state.searchSlice.isOpened)

	const { onChangeOpen } = searchSlice.actions
	const dispatch = useDispatch()

	return (
		<div className={classNames(s.search, { [className || '']: className })} onClick={() => dispatch(onChangeOpen(true))}>
			<IoSearch fill="#000" size={35} />
			<span className={s.search__input}>Поиск...</span>
			<span className={s.search__hotkey}>CTRL + <aside>K</aside> </span>
			<SearchModal isOpened={isOpenedModal} onClose={() => dispatch(onChangeOpen(false))} />
		</div>
	)
}
