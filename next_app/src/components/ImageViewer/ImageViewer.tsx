import { useTypedSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { Modal } from '../Modal/Modal'
import s from './ImageViewer.module.css'
import { imageViewerSlice } from './slices/imageViewer.slice'

const ImageViewer = () => {

	const isOpened = useTypedSelector((state) => state.imageViewerSlice.isOpened)
	const imageSrc = useTypedSelector((state) => state.imageViewerSlice.imageSrc)
	const alt = useTypedSelector((state) => state.imageViewerSlice.alt)

	const dispatch = useDispatch()
	const { onChangeOpen } = imageViewerSlice.actions

	return (
		<Modal isOpened={isOpened} onClose={() => dispatch(onChangeOpen(false))}>
			<div className={s.viewer}>
				<img src={imageSrc} alt={alt} />
				{alt.length ? <span>{alt}</span> : <></>}
			</div>
		</Modal>
	)
}

export default ImageViewer