import { RsyaBlock } from '@/components/RsyaBlock/RsyaBlock'
import { iBook } from '@/pages/langs/[id]'
import classNames from 'classnames'
import { FC } from 'react'
import { LangDocsSidebarBook } from '../LangDocsSidebarBook/LangDocsSidebarBook'
import s from './LangDocsRightSidebar.module.css'

interface iProps {
	books: iBook[]
}

export const LangDocsRightSidebar: FC<iProps> = ({ books }) => {
	return (
		<div className={s.area}>
			<div className={s.sidebar}>
				<div className={s.block}>
					<div className={classNames(s.block__row, s.block__row_title)}>
						<h4 className={s.block__title}>Рекомендуем к справочнику</h4>
						{/* {data && data.length ? <Link href="/blog" className={s.button__view_all}> Показать все</Link> : <></>} */}
					</div>
					<div className={s.block__column}>
						{
							books && books.length
								? books.map((book) => {
									return (
										<LangDocsSidebarBook
											key={book.title}
											title={book.title}
											author={book.author}
											imageUrl={book.logo_url}
										/>
									)
								})
								: <aside className={s.block__empty}>
									В списке пока нет материалов. Ожидайте их позднее
								</aside>
						}
					</div>
				</div>
			</div>
			<div className={classNames(s.sidebar, s.sidebar_rsya)}>
				<RsyaBlock
					blockId='yandex_rtb_R-A-3621775-2'
					codeBlock='window.yaContextCb.push(()=>{
					Ya.Context.AdvManager.render({
						"blockId": "R-A-3621775-2",
						"renderTo": "yandex_rtb_R-A-3621775-2"
					})
				})'
				/>
			</div>
		</div >
	)
}
