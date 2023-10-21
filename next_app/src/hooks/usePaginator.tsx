import { useEffect, useState } from "react"

export const usePaginator = (totalPage: number, callback: (action: '+' | '-' | undefined, page: number) => void, initialItems: any[], noScroll = false) => {

	const [items, setItems] = useState<any[]>(initialItems)
	const [currentPage, setCurrentPage] = useState<number>(1)

	function onClickPaginator(action: '+' | '-') {
		if (action === '+' && currentPage + 1 <= totalPage) {
			callback('+', currentPage + 1)
			setCurrentPage((prev) => prev + 1)
			return
		}
		if (action === '-' && currentPage - 1 >= 1) {
			callback('-', currentPage - 1)
			setCurrentPage((prev) => prev - 1)
			return
		}
	}

	function setPagePaginator(page: number) {
		setCurrentPage(page)
		callback(undefined, page)
		return
	}

	useEffect(() => {
		if (!noScroll) {
			window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
		}
	}, [items, noScroll])

	return { items, onClickPaginator, currentPage, setItems, setPagePaginator }
}