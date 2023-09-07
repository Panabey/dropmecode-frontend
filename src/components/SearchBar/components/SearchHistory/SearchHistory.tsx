import { FC } from 'react'
import { AiOutlineHistory } from 'react-icons/ai'
import { iSearchHistoryItem } from '../../slices/search.slice'
import { SearchItem } from '../SearchItem/SearchItem'
import s from './SearchHistory.module.css'

interface iProps {
	history: iSearchHistoryItem[]
	removeHistoryItem: (item: iSearchHistoryItem) => void
}


export const SearchHistory: FC<iProps> = ({ history, removeHistoryItem }) => {

	function onClickRemoveItem(event: MouseEvent, item: iSearchHistoryItem) {
		event.preventDefault()
		event.stopPropagation()
		removeHistoryItem(item)
	}

	return (
		<div className={s.history}>
			{
				history.length === 0
					? <div className={s.history__empty}>
						<AiOutlineHistory color='#000' size={100} />
						<h4>История поиска пуста</h4>
						<p>Вы не искали ещё ни одной страницы. Пожалуйста, выберите категорию поиска, введите текст в поле ввода и найдите нужный вам материал!</p>
					</div>
					: <div className={s.items}>
						<HistoryLinks history={history} filter='langs' title='Справочники' onRemoveItem={onClickRemoveItem} />
						<HistoryLinks history={history} filter='articles' title='Статьи' onRemoveItem={onClickRemoveItem} />
						<HistoryLinks history={history} filter='quizes' title='Квизы' onRemoveItem={onClickRemoveItem} />
					</div>
			}
		</div>
	)
}

interface iHistoryLinks {
	title: string
	filter: string
	history: iSearchHistoryItem[]
	onRemoveItem: (event: MouseEvent, item: iSearchHistoryItem) => void
}

const HistoryLinks: FC<iHistoryLinks> = ({ history, title, filter, onRemoveItem }) => {

	if (history.filter((theme) => theme.label === filter).length === 0) {
		return <></>
	}

	return (
		<div className={s.items__block}>
			<h4 className={s.items__title}>{title}</h4>
			<div className={s.items__column}>
				{history.filter((theme) => theme.label === filter).map((item) => {
					return (
						<SearchItem {...item} key={item.link} onRemoveItem={onRemoveItem} isHistoryItem={true}>
							<AiOutlineHistory color='#000' size={25} className={s.item__icon_time} />
						</SearchItem>
					)
				})}
			</div>
		</div>
	)
}