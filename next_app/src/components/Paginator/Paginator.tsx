import classNames from 'classnames'
import { FC } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import s from './Paginator.module.css'

interface iProps {
	currentPage: number
	onClickPaginator: (action: '+' | '-') => void
	setPagePaginator: (page: number) => void
	totalPage: number
}

export const Paginator: FC<iProps> = ({ currentPage, onClickPaginator, totalPage, setPagePaginator }) => {
	return (
		<div className={s.paginator}>
			<IoIosArrowBack fill="#000" className={classNames(s.arrow, { [s.disabled]: currentPage <= 1 })} size={20} onClick={() => onClickPaginator('-')} />
			<div className={s.row}>
				{
					currentPage - 2 > 1
						? <div className={s.row}>
							<aside className={s.page__unselected} onClick={() => setPagePaginator(1)}>
								{1}
							</aside>
							{currentPage - 2 > 2 ? <span className={s.dots}>...</span> : <></>}
						</div>
						: <></>
				}
				{
					currentPage - 2 >= 1
						? <aside className={s.page__unselected} onClick={() => setPagePaginator(currentPage - 2)}>
							{currentPage - 2}
						</aside>
						: <></>
				}
				{
					currentPage - 1 >= 1
						? <aside className={s.page__unselected} onClick={() => setPagePaginator(currentPage - 1)}>
							{currentPage - 1}
						</aside>
						: <></>
				}
			</div>
			<aside className={s.page__current}>
				{currentPage}
			</aside>
			<div className={s.row}>
				{
					currentPage + 1 < totalPage
						? <aside className={s.page__unselected} onClick={() => setPagePaginator(currentPage + 1)}>
							{currentPage + 1}
						</aside>
						: <></>
				}
				{
					currentPage + 2 < totalPage
						? <aside className={s.page__unselected} onClick={() => setPagePaginator(currentPage + 2)}>
							{currentPage + 2}
						</aside>
						: <></>
				}
				{
					currentPage !== totalPage
						? <div className={s.row}>
							{currentPage + 3 < totalPage ? <span className={s.dots}>...</span> : <></>}
							<aside className={s.page__unselected} onClick={() => setPagePaginator(totalPage)}>
								{totalPage}
							</aside>
						</div>
						: <></>
				}
			</div>
			<IoIosArrowForward fill="#000" className={classNames(s.arrow, { [s.disabled]: currentPage >= totalPage })} size={20} onClick={() => onClickPaginator('+')} />
		</div>
	)
}
