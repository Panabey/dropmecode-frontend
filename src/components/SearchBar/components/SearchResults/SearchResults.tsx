import { FC } from 'react'
import { BsBook } from 'react-icons/bs'
import { TbMessageQuestion } from 'react-icons/tb'
import { iSearchHistoryItem, searchSlice } from '../../slices/search.slice'
// import { SearchItem } from '../SearchItem/SearchItem'
import { UPLOADS_URL } from '@/lib/constants'
import { useDispatch } from 'react-redux'
import { SearchItem } from '../SearchItem/SearchItem'
import { SearchItemExtended } from '../SearchItemExended/SearchItemExended'
import s from './SearchResults.module.css'

interface iProps {
	results: iSearchHistoryItem[]
}

export const SearchResults: FC<iProps> = ({ results }) => {

	const dispatch = useDispatch()
	const { onAddHistoryItem } = searchSlice.actions

	function addHistoryItem(_: MouseEvent, item: iSearchHistoryItem) {
		dispatch(onAddHistoryItem(item))
	}

	return (
		<div className={s.results}>
			{
				results.length === 0
					? <div className={s.results__empty}>
						<TbMessageQuestion color='#000' size={100} />
						<h4>Поиск не дал результатов</h4>
						<p>К сожалению, по такому запросу мы не смогли найти никакого материала. Попробуйте переформулировать запрос и провести поиск снова</p>
					</div>
					: <div className={s.items}>
						<div className={s.items__block}>
							<div className={s.items__column}>
								{results.map((item) => {
									if (item.label === 'langs') {
										return (
											<SearchItem {...item} key={item.link} isHistoryItem={false} onAddItem={addHistoryItem}>
												<BsBook color='#000' size={25} className={s.item__icon_book} />
											</SearchItem>
										)
									} else {
										return (
											<SearchItemExtended {...item} key={item.link} isHistoryItem={false} imageUrl={(item.imageUrl || '')} onAddItem={addHistoryItem} />
										)
									}
								})}
							</div>
						</div>
					</div>
			}
		</div>
	)
}
