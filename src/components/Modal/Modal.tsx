import classNames from 'classnames'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import s from './Modal.module.css'

interface iProps {
	isOpened: boolean
	onClose: () => void
	children: ReactNode
	className?: string
}

export const Modal: FC<iProps> = ({
	isOpened,
	onClose,
	children,
	className,
}) => {
	const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false)
	const [isMounted, setIsMounted] = useState<boolean>(false)

	const ref = useRef<null | HTMLDivElement>(null)

	useEffect(() => {
		if (isOpened) {
			setIsOpenedModal(true)
		} else {
			if (ref.current) {
				setIsMounted(false)
				setTimeout(() => {
					setIsOpenedModal(false)
					onClose()
				}, 300)
			}
		}
	}, [isOpened])

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (isOpenedModal) {
			timer = setInterval(() => {
				if (ref.current) {
					setIsMounted(true)
					clearInterval(timer)
				}
			}, 10)
		}
	}, [isOpenedModal])

	useEffect(() => {
		function onClickDocument(this: Document, event: globalThis.MouseEvent) {
			if (event.target === ref.current) {
				setIsMounted(false)
				setTimeout(() => {
					setIsOpenedModal(false)
					onClose()
				}, 300)
			}
		}
		document.addEventListener('click', onClickDocument)
		return () => {
			document.removeEventListener('click', onClickDocument)
		}
	})

	if (isOpenedModal) {
		return ReactDOM.createPortal(
			<div
				className={classNames(
					s.layout,
					{ [s.mounted]: isMounted },
					{ [className || '']: className }
				)}
				ref={ref}
			>
				{children}
			</div>,
			document.querySelector('#modal') as Element
		)
	} else {
		return <></>
	}
}
