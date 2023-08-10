import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PartitionInfo, iLink } from '@/components/PartitionInfo/PartitionInfo'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import s from './LangDocsPageBuilder.module.css'

const links: iLink[] = [
	{ navigationUrl: "/langs/javascript/start", partnumber: "1.1", title: "Что такое Javascript?" },
	{ navigationUrl: "/langs/javascript/start-write", partnumber: "1.2", title: "Где писать код на Javascript?" },
	{ navigationUrl: "/langs/javascript/first-program", partnumber: "1.3", title: "Моя первая программа" },
	{ navigationUrl: "/langs/javascript/tools", partnumber: "1.4", title: "Инструменты для работы с JS" },
	{ navigationUrl: "/langs/javascript/books", partnumber: "1.5", title: "Справочники и стандарты" },
	{ navigationUrl: "/langs/javascript/articles", partnumber: "1.6", title: "Полезные статьи" }
]

const links2: iLink[] = [
	{ navigationUrl: "/langs/javascript/rules-syntax", partnumber: "2.1", title: "Правила синтаксиса" },
	{ navigationUrl: "/langs/javascript/variables", partnumber: "2.2", title: "Переменнные и константы" },
	{ navigationUrl: "/langs/javascript/data-types", partnumber: "2.3", title: "Типы данных" },
	{ navigationUrl: "/langs/javascript/data-types-convert", partnumber: "2.4", title: "Преобразование типов" },
	{ navigationUrl: "/langs/javascript/browser-native-windows", partnumber: "2.5", title: "Браузерные всплывающие окна (alert, confirm и тд.)" },
	{ navigationUrl: "/langs/javascript/conditional-expressions", partnumber: "2.6", title: "Условные выражиения (if else)" },
	{ navigationUrl: "/langs/javascript/math-and-logical-operators", partnumber: "2.7", title: "Математические и логические операторы" },
	{ navigationUrl: "/langs/javascript/cycles", partnumber: "2.8", title: "Циклы (for, while, forEach)" },
	{ navigationUrl: "/langs/javascript/cycles-extended", partnumber: "2.9", title: "Циклы: продвинутые (for in, for of, do while)" },
	{ navigationUrl: "/langs/javascript/functions", partnumber: "2.10", title: "Функции" },
]

export const LangDocsPageBuilder = () => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<SearchBar />
					<PageCommonInfo
						title='Javascript'
						description='При помощи данного справочника вы сможете освоить основы языка - Javascript и начать писать на нем простые программы. Мир Javascript многогранен, поэтому при помощи этого языка вы способны решить множество различных задач'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Языки программирования", navigationUrl: "/langs" }, { title: "Javascript", navigationUrl: "/langs/javascript" }]}
					/>
					<PartitionInfo
						partNumber={1}
						title="Введение"
						description='В данном разделе описан процесс знакомства с языком - Javascript. Первые шаги для работы с ним и для чего он предназначен. Как начать писать на нем первые программы'
						links={links}
						className={s.partition__info}
					/>
					<PartitionInfo
						partNumber={2}
						title="Основы Javacscript"
						description='В данном разделе вы получите основную информацию о синтаксисе и кодовых конструкциях языка, которые позволят осознанно писать код'
						links={links2}
						className={s.partition__info}
					/>
				</Container>
			</div>
		</Layout>
	)
}
