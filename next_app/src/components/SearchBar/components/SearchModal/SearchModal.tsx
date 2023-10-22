import { useTypedSelector } from '@/redux/store'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoClose, IoSearch } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import getSlug from 'speakingurl'
import { iSearchArticles, iSearchHandbookThemes, iSearchQuizes, useGetArticlesMutation, useGetHandbookThemesMutation, useGetQuizesMutation } from '../../api/search.api'
import { iSearchHistoryItem, searchSlice } from '../../slices/search.slice'
import { SearchHistory } from '../SearchHistory/SearchHistory'
import { SearchLoader } from '../SearchLoader/SearchLoader'
import { SearchResults } from '../SearchResults/SearchResults'
import { SearchSelector } from '../SearchSelector/SearchSelector'
import { SearchTags } from '../SearchTags/SearchTags'
import s from "./SearchModal.module.css"

interface iProps {
	isOpened: boolean
	onClose: () => void
}

export const SearchModal: FC<iProps> = ({ isOpened, onClose }) => {
	const ref = useRef<Element | null>(null)
	const [mounted, setMounted] = useState<boolean>(false)
	const overlayRef = useRef<HTMLDivElement | null>(null)

	const isIncludeTags = useTypedSelector((state) => state.searchSlice.isIncludeTags)
	const searchTags = useTypedSelector((state) => state.searchSlice.tags)
	const [searchValue, setSearchValue] = useState<string>('')
	const selectedFilter = useTypedSelector((state) => state.searchSlice.selectedFilter)
	const history = useTypedSelector((state) => state.searchSlice.history)
	const { onChangeFilter, onRemoveHistoryItem, initStore } = searchSlice.actions
	const dispatch = useDispatch()

	const [searchResults, setSearchResults] = useState<iSearchHistoryItem[]>([])
	const [fetchHandbooks, { isLoading: isLoadingHandbooks, data: dataHandbooks, error: errorHandbooks, reset: resetHandbooks }] = useGetHandbookThemesMutation()
	const [fetchArticles, { isLoading: isLoadingArticles, data: dataArticles, error: errorArticles, reset: resetArticles }] = useGetArticlesMutation()
	const [fetchQuizes, { isLoading: isLoadingQuizes, data: dataQuizes, error: errorQuizes, reset: resetQuizes }] = useGetQuizesMutation()
	const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false)

	const router = useRouter()

	function onCloseModal() {
		onClose()
		setSearchValue('')
		dispatch(onChangeFilter('langs'))
	}

	// useEffect(() => {
	// 	if (router.isReady) {
	// 		onCloseModal()
	// 	}
	// }, [router])

	useEffect(() => {
		ref.current = document.querySelector<HTMLElement>("#search")
		setMounted(true)
	}, [])

	useEffect(() => {
		function onClickDocument(event: MouseEvent) {
			if (event.target === overlayRef.current) {
				onCloseModal()
			}
		}
		document.addEventListener('click', onClickDocument, false)

		return () => {
			document.removeEventListener('click', onClickDocument)
		}
	}, [onCloseModal])

	useEffect(() => {
		dispatch(initStore())
	}, [])

	useEffect(() => {
		if (isOpened) {
			if (searchValue.length === 0) {
				if (searchResults.length) {
					setSearchResults([])
				}
			}
		}
	}, [isOpened, searchValue])

	useEffect(() => {
		let timer: any;
		if ((isOpened && searchValue.length > 0) || (isOpened && isIncludeTags && searchTags.filter((tag) => tag.isSelected === true).length > 0)) {
			const tags = isIncludeTags ? searchTags.filter((tag) => tag.isSelected === true).map((tag) => tag.id) : []
			const searchString = searchValue.length > 0 ? searchValue : undefined
			setIsLoadingSearch(true)
			timer = setTimeout(() => {
				switch (selectedFilter) {
					case 'langs':
						fetchHandbooks({ q: String(searchString), limit: 15 })
						resetArticles()
						resetQuizes()
						break;
					case 'articles':
						fetchArticles({ q: searchString, limit: 15, tags: tags })
						resetHandbooks()
						resetQuizes()
						break;
					case 'quizes':
						fetchQuizes({ q: searchString, limit: 15, tags: tags })
						resetHandbooks()
						resetArticles()
						break;
				}
				setIsLoadingSearch(false)
			}, 600)
		} else {
			setSearchResults([])
			resetArticles()
			resetQuizes()
			resetHandbooks()
		}
		if (isOpened && searchValue.length === 0) {
			setIsLoadingSearch(false)
		}
		return () => {
			clearTimeout(timer)
		}
	}, [searchValue, selectedFilter, isOpened, fetchHandbooks, fetchArticles, fetchQuizes, searchTags, isIncludeTags, setSearchResults, setIsLoadingSearch])

	useEffect(() => {
		if (!isLoadingHandbooks && dataHandbooks && selectedFilter === 'langs') {
			setSearchResults(dataHandbooks.map((theme: iSearchHandbookThemes) => {
				{
					return {
						title: theme.page_title,
						link: `/langs/${getSlug(theme.title.toLowerCase(), { lang: 'ru' })}/${theme.page_id}-${getSlug(theme.page_title.split(' ').filter((_, idx) => idx !== 0).join(' ').toLowerCase(), { lang: 'ru' })}`,
						label: 'langs',
						theme: theme.title
					}
				}
			}))
		}
	}, [isLoadingHandbooks, dataHandbooks, setSearchResults, selectedFilter])

	useEffect(() => {
		if (!isLoadingArticles && dataArticles && selectedFilter === 'articles') {
			setSearchResults(dataArticles.map((article: iSearchArticles) => {
				{
					return {
						title: article.title,
						link: `/articles/${article.id}-${getSlug(article.title, { lang: 'ru' })}`,
						label: 'articles',
						theme: article.anons,
						imageUrl: article.logo_url
					}
				}
			}))
		}
	}, [isLoadingArticles, dataArticles, setSearchResults, selectedFilter])

	useEffect(() => {
		if (!isLoadingQuizes && dataQuizes && selectedFilter === 'quizes') {
			setSearchResults(dataQuizes.map((quiz: iSearchQuizes) => {
				{
					return {
						title: quiz.title,
						link: `/quizes/content/${quiz.id}-${getSlug(quiz.title, { lang: 'ru' })}`,
						label: 'quizes',
						theme: quiz.short_description,
						imageUrl: quiz.logo_url
					}
				}
			}))
		}
	}, [isLoadingQuizes, dataQuizes, setSearchResults, selectedFilter])

	if (errorArticles || errorHandbooks || errorQuizes) {
		console.error(errorArticles, errorHandbooks, errorQuizes)
		throw new Error("Ошибка при отправке клиентского запроса на поиск")
	}

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
						{!searchResults.length && !searchValue.length ? <SearchHistory queryIsFetched={Boolean(dataHandbooks) || Boolean(dataArticles) || Boolean(dataQuizes)}  history={history} removeHistoryItem={(item) => dispatch(onRemoveHistoryItem(item))} /> : <></>}
						{isLoadingQuizes
							|| isLoadingArticles
							|| isLoadingHandbooks
							|| isLoadingSearch
							? <SearchLoader />
							: (<SearchResults results={searchResults} queryIsFetched={Boolean(dataHandbooks) || Boolean(dataArticles) || Boolean(dataQuizes)} />)}
						<div className={s.statusbar}>
							<SearchTags />
						</div>
					</div>
				</div>
				: <></>
			, ref.current)
		: null
}