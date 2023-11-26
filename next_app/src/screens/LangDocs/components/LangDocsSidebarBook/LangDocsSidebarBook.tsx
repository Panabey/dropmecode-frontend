import { imageViewerSlice } from '@/components/ImageViewer/slices/ImgViewer.slice'
import { UPLOADS_URL } from '@/lib/constants'
import Image from 'next/image'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import s from './LangDocsSidebarBook.module.css'

interface iProps {
	title: string
	author: string
	imageUrl?: string
}

export const LangDocsSidebarBook: FC<iProps> = ({ title, author, imageUrl }) => {

	const dispatch = useDispatch()
	const { onChangeOpen, setValues } = imageViewerSlice.actions

	function onClickIcon(imageSrc: string, alt: string) {
		dispatch(setValues({ imageSrc, alt, customClass: s.iconViewer }));
		dispatch(onChangeOpen(true));
	}

	return (
		<>
			<button className={s.link}>
				{imageUrl
					? <Image width={512} height={512} alt="Картинка материала" src={UPLOADS_URL + imageUrl} className={s.icon} onClick={() => onClickIcon(UPLOADS_URL + imageUrl, title)} />
					: <></>
				}
				<div className={s.content}>
					<h5 className={s.title}>{title}</h5>
					<span className={s.datetime}>{author}</span>
				</div>
			</button>
			<hr className={s.block__underline} />
		</>
	)
}
