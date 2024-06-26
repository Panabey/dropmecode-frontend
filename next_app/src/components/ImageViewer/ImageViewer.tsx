import { useTypedSelector } from '@/redux/store'
import classNames from 'classnames'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { Modal } from '../Modal/Modal'
import s from './ImageViewer.module.css'
import { imageViewerSlice } from './slices/ImgViewer.slice'

const ImageViewer = () => {

	const isOpened = useTypedSelector((state) => state.imageViewerSlice.isOpened)
	const imageSrc = useTypedSelector((state) => state.imageViewerSlice.imageSrc)
	const customClass = useTypedSelector((state) => state.imageViewerSlice.customClass)
	const alt = useTypedSelector((state) => state.imageViewerSlice.alt)

	const dispatch = useDispatch()
	const { onChangeOpen } = imageViewerSlice.actions

	return (
		<Modal isOpened={isOpened} onClose={() => dispatch(onChangeOpen(false))} className={s.modal}>
			<div className={classNames(s.viewer, { [String(customClass) ?? '']: customClass })}>
				<Image src={imageSrc} alt={alt} width={2000} height={2000} />
				{alt.length ? <span>{alt}</span> : <></>}
			</div>
		</Modal>
	)
}

export default ImageViewer