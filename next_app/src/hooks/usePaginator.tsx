import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePaginator = (totalPage: number, callback: (action: '+' | '-' | undefined, page: number) => void, initialItems: any[], noScroll = false, defaultCurrentPage: number) => {

	const [items, setItems] = useState<any[]>(initialItems)
	const [currentPage, setCurrentPage] = useState<number>(defaultCurrentPage)

	const router = useRouter();

	function onClickPaginator(action: '+' | '-') {
		if (action === '+' && currentPage + 1 <= totalPage) {
			const url = {
				pathname: router.pathname,
				query: { ...router.query, page_id: String(currentPage + 1) }
			}
			callback('+', currentPage + 1)
			setCurrentPage((prev) => prev + 1)
			router.push(url, undefined, { shallow: true })
			return
		}
		if (action === '-' && currentPage - 1 >= 1) {
			const url = {
				pathname: router.pathname,
				query: { ...router.query, page_id: String(currentPage - 1) }
			}
			callback('-', currentPage - 1)
			setCurrentPage((prev) => prev - 1)
			router.push(url, undefined, { shallow: true })
			return
		}
	}

	function setPagePaginator(page: number) {
		setCurrentPage(page)
		callback(undefined, page)
		const url = {
			pathname: router.pathname,
			query: { ...router.query, page_id: String(page) }
		}
		router.push(url, undefined, { shallow: true })
		return
	}

	useEffect(() => {
		if (!noScroll) {
			window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
		}
	}, [items, noScroll])

	return { items, onClickPaginator, currentPage, setItems, setPagePaginator }
}