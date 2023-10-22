import { FC } from 'react'
import { AiOutlineHistory } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'
import { iSearchHistoryItem } from '../../slices/search.slice'
import { SearchItem } from '../SearchItem/SearchItem'
import { SearchItemExtended } from '../SearchItemExended/SearchItemExended'
import s from './SearchHistory.module.css'

interface iProps {
	history: iSearchHistoryItem[]
	removeHistoryItem: (item: iSearchHistoryItem) => void
	queryIsFetched: boolean
}


export const SearchHistory: FC<iProps> = ({ history, removeHistoryItem, queryIsFetched }) => {

	function onClickRemoveItem(event: MouseEvent, item: iSearchHistoryItem) {
		event.preventDefault()
		event.stopPropagation()
		removeHistoryItem(item)
	}

	if (history.length === 0 && !queryIsFetched) {
		return (
			<div className={s.history__empty} >
				<AiOutlineHistory color='#000' size={100} />
				<h4>История поиска пуста</h4>
				<p>Вы не искали ещё ни одной страницы. Пожалуйста, выберите категорию поиска, введите текст в поле ввода и найдите нужный вам материал!</p>
			</div >
		)
	} else {
		if (history.length > 0 && !queryIsFetched) {
			return (
				<div className={s.items}>
					<HistoryLinks history={history} filter='langs' title='Справочники' onRemoveItem={onClickRemoveItem} />
					<HistoryLinks history={history} filter='articles' title='Статьи' onRemoveItem={onClickRemoveItem} />
					<HistoryLinks history={history} filter='quizes' title='Квизы' onRemoveItem={onClickRemoveItem} />
				</div>
			)
		} else {
			return (
				<></>
			)
		}
	}

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
					if (item.label === 'langs') {
						return (
							<SearchItem {...item} key={item.link} isHistoryItem={false} onRemoveItem={onRemoveItem}>
								<BsBook color='#000' size={25} className={s.item__icon_book} />
							</SearchItem>
						)
					} else {
						return (
							<SearchItemExtended {...item} key={item.link} isHistoryItem={false} imageUrl={(item.imageUrl || '')} onRemoveItem={onRemoveItem} />
						)
					}
				})}
			</div>
		</div>
	)
}