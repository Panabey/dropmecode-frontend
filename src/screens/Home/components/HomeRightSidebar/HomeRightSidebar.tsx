import classNames from 'classnames'
import Link from 'next/link'
import { useGetBlogNotesQuery } from '../../api/home.api'
import { HomeSidebarNews } from '../HomeSidebarNews/HomeSidebarNews'
import { HomeSidebarNewsLoader } from '../HomeSidebarNewsLoader/HomeSidebarNewsLoader'
import s from './HomeRightSidebar.module.css'

export const HomeRightSidebar = () => {

	const { data, isLoading, error } = useGetBlogNotesQuery({ limit: 5 })

	if (error) {
		console.error(error)
		throw new Error('Ошибка при загрузке постов блога на главной')
	}

	return (
		<div className={s.sidebar}>
			<div className={s.block}>
				<div className={classNames(s.block__row, s.block__row_title)}>
					<h4 className={s.block__title}>Новости проекта</h4>
					{data && data.length ? <Link href="/blog" className={s.button__view_all}> Показать все</Link> : <></>}
				</div>
				<div className={s.block__column}>
					{isLoading ?
						new Array(5).fill(null).map((_, idx) => {
							return (
								<HomeSidebarNewsLoader key={idx} />
							)
						})
						: data && data.length
							? data.map((note) => {
								return (
									<HomeSidebarNews
										key={note.id}
										id={note.id}
										title={note.title}
										createDateTime={note.create_date}
									/>
								)
							})
							: <aside className={s.block__empty}>
								В блоге пока нет информации. Ожидайте её позднее
							</aside>
					}
				</div>
			</div>
		</div>
	)
}
