import { FC } from 'react'
import { BsBook } from 'react-icons/bs'
import { TbMessageQuestion } from 'react-icons/tb'
import { iSearchHistoryItem } from '../../slices/search.slice'
import { SearchItem } from '../SearchItem/SearchItem'
import s from './SearchResults.module.css'

interface iProps {
	results: iSearchHistoryItem[]
}

export const SearchResults: FC<iProps> = ({ results }) => {
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
									return (
										<SearchItem {...item} key={item.link} isHistoryItem={false}>
											<BsBook color='#000' size={25} className={s.item__icon_book} />
										</SearchItem>
									)
								})}
							</div>
						</div>
					</div>
			}
		</div>
	)
}
