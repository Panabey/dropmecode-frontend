import { useTypedSelector } from '@/redux/store'
import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoClose, IoSearch } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { iSearchHistoryItem, searchSlice } from '../../slices/search.slice'
import { SearchHistory } from '../SearchHistory/SearchHistory'
import { SearchResults } from '../SearchResults/SearchResults'
import { SearchSelector } from '../SearchSelector/SearchSelector'
import s from "./SearchModal.module.css"

interface iProps {
	isOpened: boolean
	onClose: () => void
}

export const SearchModal: FC<iProps> = ({ isOpened, onClose }) => {
	const ref = useRef<Element | null>(null)
	const [mounted, setMounted] = useState<boolean>(false)
	const overlayRef = useRef<HTMLDivElement | null>(null)

	const [searchValue, setSearchValue] = useState<string>('')
	const selectedFilter = useTypedSelector((state) => state.searchSlice.selectedFilter)
	const history = useTypedSelector((state) => state.searchSlice.history)
	const { onChangeFilter, onRemoveHistoryItem, initStore } = searchSlice.actions
	const dispatch = useDispatch()

	const [searchResults, setSearchResults] = useState<iSearchHistoryItem[]>([])

	useEffect(() => {
		ref.current = document.querySelector<HTMLElement>("#search")
		setMounted(true)
	}, [])

	useEffect(() => {
		function onClickDocument(event: MouseEvent) {
			if (event.target === overlayRef.current) {
				onClose()
				setSearchValue('')
				dispatch(onChangeFilter('langs'))
			}
		}
		document.addEventListener('click', onClickDocument, false)

		return () => {
			document.removeEventListener('click', onClickDocument)
		}
	}, [])

	useEffect(() => {
		dispatch(initStore())
	}, [])

	useEffect(() => {
		let timer: any;
		if (isOpened) {
			if (searchValue.length === 0) {
				if (searchResults.length) {
					setSearchResults([])
				}
			} else {
				timer = setTimeout(() => {
					console.log('debounce')
				}, 300)
			}

		}
		return () => {
			clearTimeout(timer)
		}
	}, [searchValue, searchResults, selectedFilter, isOpened])

	return (mounted && ref.current)
		? createPortal(
			isOpened
				? <div className={s.overlay} ref={overlayRef}>
					<div className={s.modal}>
						<div className={s.controls}>
							<div className={s.searchbar}>
								<IoSearch fill="#000" size={35} className={s.searchbar__icon_search} />
								<input value={searchValue} type="text" placeholder='Поиск...' className={s.searchbar__input} onChange={(e) => setSearchValue(e.target.value)} />
								{searchValue.length > 0 && <IoClose className={s.searchbar__icon_clear} fill="#000" size={22} onClick={() => setSearchValue('')} />}
							</div>
							<SearchSelector selectedFilter={selectedFilter} onChangeFilter={(filter) => dispatch(onChangeFilter(filter))} />
						</div>
						{!searchResults.length && <SearchHistory history={history} removeHistoryItem={(item) => dispatch(onRemoveHistoryItem(item))} />}
						{searchResults.length && <SearchResults results={searchResults} />}
						<div className={s.results}>
						</div>
						<div className={s.statusbar}>

						</div>
					</div>
				</div>
				: <></>
			, ref.current)
		: null
}