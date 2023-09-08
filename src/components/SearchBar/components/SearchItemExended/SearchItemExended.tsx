import { splitText } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { IoClose } from 'react-icons/io5'
import { iSearchHistoryItem } from '../../slices/search.slice'
import s from './SearchItemExended.module.css'
import { BsArrowBarRight } from 'react-icons/bs'
import { UPLOADS_URL } from '@/lib/constants'

interface iProps extends iSearchHistoryItem {
	onRemoveItem?: (event: MouseEvent, item: iSearchHistoryItem) => void
	onAddItem?: (event: MouseEvent, item: iSearchHistoryItem) => void
	isHistoryItem: boolean
	imageUrl: string
}

export const SearchItemExtended: FC<iProps> = ({ link, title, theme, label, onRemoveItem, onAddItem, isHistoryItem, imageUrl }) => {
	return (
		<Link className={s.item} href={link} onClick={onAddItem ? (event: any) => onAddItem(event, { link, title, theme, label, imageUrl }) : () => { }}>
			<Image src={UPLOADS_URL + imageUrl} width={512} height={512} alt="Картинка" className={s.image} />
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
