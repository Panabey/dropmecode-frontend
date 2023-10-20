import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { BsArrowBarRight } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { iSearchHistoryItem, searchSlice } from '../../slices/search.slice'
import s from './SearchItem.module.css'

interface iProps extends iSearchHistoryItem {
	children: ReactNode
	onRemoveItem?: (event: MouseEvent, item: iSearchHistoryItem) => void
	onAddItem?: (event: MouseEvent, item: iSearchHistoryItem) => void
	isHistoryItem: boolean
}

export const SearchItem: FC<iProps> = ({ link, title, theme, label, children, isHistoryItem, onRemoveItem, onAddItem }) => {

	const dispatch = useDispatch()
	const { onChangeOpen } = searchSlice.actions

	function onClickItem(event: any) {
		event.stopPropagation()
		if (onAddItem) {
			onAddItem(event, { link, title, theme, label })
		}
		dispatch(onChangeOpen(false))
	}

	return (
		<Link className={s.item} href={link} onClick={onClickItem}>
			{children}
			<div className={s.item__row}>
				<div className={s.item__content}>
					<span>{title}</span>
					<aside>{theme}</aside>
				</div>
				<div className={s.icons}>
					{isHistoryItem
						&& <IoClose
							className={s.item__icon_delete}
							fill="#000"
							size={22}
							onClick={onRemoveItem ? (event: MouseEvent) => onRemoveItem(event, { link, title, theme, label }) : () => { }}
						/>
					}
					<BsArrowBarRight className={s.item__icon_arrow} color='#000' size={25} />
				</div>
			</div>
		</Link>
	)
}
