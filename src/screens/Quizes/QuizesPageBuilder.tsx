import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import Link from 'next/link'
import { BiLogoJavascript } from 'react-icons/bi'
import { HiFire } from 'react-icons/hi'
import s from './QuizesPageBuilder.module.css'
import { QuizPreview, iQuizPreview } from './components/QuizPreview/QuizPreview'

export const quizes: iQuizPreview[] = [{
	id: 1,
	slug: "kakoy-ti-smesharik",
	description: "Пройдите простой тест и узнайте, кем бы вы были во вселенной смешариков",
	imageUrl: "/assets/Quizes/1.jpg",
	title: "Кто ты из смешариков?",
},
{
	id: 2,
	slug: "chei-crym",
	description: "Проявите дедуктивные способности и определите, какой же стране принадлежит полуостров - Крым",
	imageUrl: "/assets/Quizes/2.jpg",
	title: "Кому принадлежит Крым?",
},
{
	id: 3,
	slug: "test-na-znanie-yazika-programmirovanya-javascrpit",
	description: "Вы думаете, что хорошо знаете язык программирования - Javascript? Сейчас мы это проверим :)",
	imageUrl: "/assets/Quizes/js.png",
	title: "Как хорошо ты знаешь Javascript?",
},
]

export const QuizesPageBuilder = () => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<SearchBar />
					<PageCommonInfo
						title='Квизы'
						description='Занимательные и развлекательные квиз-тесты для закрепления полученных знаний в области IT и не только!'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Квизы", navigationUrl: "/quizes" }]}
					/>
					<section className={s.section}>
						<div className={s.section__row}>
							<h3 className={s.section__title}><HiFire size={25} fill="#1F477D" /> Квизы дня</h3>
							<Link className={s.section__details} href="/quizes/hot">Показать все</Link>
						</div>
						<div className={s.quizes}>
							{quizes.map((quiz) => {
								return (
									<QuizPreview key={quiz.id} {...quiz} />
								)
							})}
						</div>
					</section>
					<section className={s.section}>
						<div className={s.section__row}>
							<h3 className={s.section__title}><BiLogoJavascript fill="#1F477D" size={25} /> Квизы по Javascript</h3>
							<Link className={s.section__details} href="/quizes/hot">Показать все</Link>
						</div>
						<div className={s.quizes}>
							{quizes.map((quiz) => {
								return (
									<QuizPreview key={quiz.id} {...quiz} />
								)
							})}
						</div>
					</section>
				</Container>
			</div>
		</Layout>
	)
}
