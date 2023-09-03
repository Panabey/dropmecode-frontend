import classNames from 'classnames'
import Link from 'next/link'
import s from './LangDocsLeftSidebar.module.css'

export const LangDocsLeftSidebar = () => {
	return (
		<div className={classNames(s.sidebar, s.sidebar__left)}>
			<div className={s.block}>
				<h4 className={s.block__title}>Дерево разделов</h4>
				<div className={s.block__column}>
					<div className={s.tree__section}>
						<Link href='/' className={s.tree__part}>1. Основы Python</Link>
						<div className={s.tree__links}>
							<Link href='/' className={s.tree__link}>1.1 Переменные</Link>
							<Link href='/' className={s.tree__link}>1.2 Типы данных</Link>
							<Link href='/' className={s.tree__link}>1.3 Циклы</Link>
							<Link href='/' className={s.tree__link}>1.4 Массивы</Link>
						</div>
					</div>
					<div className={s.tree__section}>
						<Link href='/' className={s.tree__part}>1. Основы Python</Link>
						<div className={s.tree__links}>
							<Link href='/' className={s.tree__link}>1.1 Переменные</Link>
							<Link href='/' className={s.tree__link}>1.2 Типы данных</Link>
							<Link href='/' className={s.tree__link}>1.3 Циклы</Link>
							<Link href='/' className={s.tree__link}>1.4 Массивы</Link>
						</div>
					</div>
					<div className={s.tree__section}>
						<Link href='/' className={s.tree__part}>1. Основы Python</Link>
						<div className={s.tree__links}>
							<Link href='/' className={s.tree__link}>1.1 Переменные</Link>
							<Link href='/' className={s.tree__link}>1.2 Типы данных</Link>
							<Link href='/' className={s.tree__link}>1.3 Циклы</Link>
							<Link href='/' className={s.tree__link}>1.4 Массивы</Link>
						</div>
					</div>
					<div className={s.tree__section}>
						<Link href='/' className={s.tree__part}>1. Основы Python</Link>
						<div className={s.tree__links}>
							<Link href='/' className={s.tree__link}>1.1 Переменные</Link>
							<Link href='/' className={s.tree__link}>1.2 Типы данных</Link>
							<Link href='/' className={s.tree__link}>1.3 Циклы</Link>
							<Link href='/' className={s.tree__link}>1.4 Массивы</Link>
						</div>
					</div>
					<div className={s.tree__section}>
						<Link href='/' className={s.tree__part}>1. Основы Python</Link>
						<div className={s.tree__links}>
							<Link href='/' className={s.tree__link}>1.1 Переменные</Link>
							<Link href='/' className={s.tree__link}>1.2 Типы данных</Link>
							<Link href='/' className={s.tree__link}>1.3 Циклы</Link>
							<Link href='/' className={s.tree__link}>1.4 Массивы</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
