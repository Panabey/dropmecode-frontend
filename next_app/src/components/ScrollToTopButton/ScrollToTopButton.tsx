import { getScrollWindowPercentage } from '@/lib/utils'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import s from './ScrollToTopButton.module.css'

const ScrollToTopButton = () => {

	const [isVisible, setIsVisible] = useState<boolean>(false)

	function onClickButton() {
		window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
	}

	useEffect(() => {
		function onScroll() {
			//Если скролл относительно начала экрана больше 20%
			if (getScrollWindowPercentage() > 20) {
				setIsVisible(true)
				document.body.classList.add('noevents')
				window.setTimeout(() => {
					document.body.classList.remove('noevents')
				}, 1000)
			} else {
				setIsVisible(false)
			}
		}
		document.addEventListener('scroll', onScroll, false)

		return () => {
			document.addEventListener('scroll', onScroll, false)
		}
	})

	return (
		<button className={classNames(s.button, { [s.visible]: isVisible })} onClick={onClickButton}><IoIosArrowUp size={20} color="#1F477D" /></button>
	)
}

export default ScrollToTopButton