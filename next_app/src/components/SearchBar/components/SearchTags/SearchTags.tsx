import { useTypedSelector } from '@/redux/store'
import classNames from 'classnames'
import { useEffect } from 'react'
import { HiPlus } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useGetTagsMutation } from '../../api/search.api'
import { searchSlice } from '../../slices/search.slice'
import s from './SearchTags.module.css'

const TAGS_API_LIMIT = 15

export const SearchTags = () => {

	const enableTags = useTypedSelector((state) => state.searchSlice.isIncludeTags)
	const tagsList = useTypedSelector((state) => state.searchSlice.tags)
	const selectedFilter = useTypedSelector((state) => state.searchSlice.selectedFilter)
	const { onAddTag, onRemoveTag, setTags } = searchSlice.actions
	const dispatch = useDispatch()

	const [fetchTags, { isLoading, data, error }] = useGetTagsMutation()

	useEffect(() => {
		if (enableTags && selectedFilter === 'quizes') {
			dispatch(setTags([]))
			fetchTags({ limit: TAGS_API_LIMIT, status: 'quiz' })
		}
		if (enableTags && selectedFilter === 'articles') {
			dispatch(setTags([]))
			fetchTags({ limit: TAGS_API_LIMIT, status: 'article' })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enableTags, selectedFilter])

	useEffect(() => {
		if (!isLoading && data) {
			dispatch(setTags(data))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isLoading])

	if (!enableTags || (selectedFilter === 'langs')) {
		return <></>
	}

	if (error) {
		console.error(error)
		throw new Error("Ошибка при загрузке списка тегов из API в поиске")
	}

	return (
		<div className={s.area}>
			<hr className={s.underline} />
			<div className={s.subarea}>
				<div className={s.tags}>
					Теги поиска:
					{
						!isLoading && tagsList.length
							? tagsList.map((tag, idx) => {
								return (
									<div className={classNames(s.tag, { [s.selected]: tag.isSelected })} key={idx}>
										{tag.title}
										{
											tag.isSelected
												? <IoClose size={16} fill="#fff" onClick={() => dispatch(onRemoveTag(tag))} />
												: <HiPlus size={14} fill="#000" onClick={() => dispatch(onAddTag(tag))} />
										}
									</div>
								)
							})
							: <></>
					}
					{
						isLoading
							? new Array(5).fill(null).map((_, idx) => {
								return (
									<div className={classNames(s.tag, s.loader, 'loader')} key={idx}></div>
								)
							})
							: <></>
					}
				</div>
			</div>
		</div>
	)
}
