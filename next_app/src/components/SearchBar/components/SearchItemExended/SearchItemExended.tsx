import { UPLOADS_URL } from '@/lib/constants'
import { splitText } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { BsArrowBarRight } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { iSearchHistoryItem, searchSlice } from '../../slices/search.slice'
import s from './SearchItemExended.module.css'

interface iProps extends iSearchHistoryItem {
	onRemoveItem?: (event: MouseEvent, item: iSearchHistoryItem) => void
	onAddItem?: (event: MouseEvent, item: iSearchHistoryItem) => void
	isHistoryItem: boolean
	imageUrl: string
}

export const SearchItemExtended: FC<iProps> = ({ link, title, theme, label, onRemoveItem, onAddItem, isHistoryItem, imageUrl }) => {

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
			<Image src={imageUrl && imageUrl.length ? UPLOADS_URL + imageUrl : '/assets/Quizes/plug1.png'} width={512} height={512} alt="Картинка" className={s.image} />
			<div className={s.item__row}>
				<div className={s.item__content}>
					<span>{title}</span>
					<aside>{splitText(theme, 50)}...</aside>
				</div>
				<div className={s.icons}>
					{isHistoryItem
						&& <IoClose
							className={s.item__icon_delete}
							fill="#000"
							size={22}
							onClick={onRemoveItem ? (event: MouseEvent) => onRemoveItem(event, { link, title, theme, label, imageUrl }) : () => { }}
						/>
					}
					<BsArrowBarRight className={s.item__icon_arrow} color='#000' size={25} />
				</div>
			</div>
		</Link>
	)
}
