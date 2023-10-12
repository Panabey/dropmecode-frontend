import { useEffect, useState } from "react"

export const useScrollHeight = () => {

	const [scrollHeight, setScrollHeight] = useState<number>(0)

	useEffect(() => {
		function onScroll() {
			setScrollHeight(window.scrollY)
		}
		document.addEventListener('scroll', onScroll, false)

		return () => {
			document.removeEventListener('scroll', onScroll, false)
		}

	}, [])

	return { scrollHeight }
}