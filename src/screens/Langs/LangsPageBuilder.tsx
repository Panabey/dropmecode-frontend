import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { SquareButtonBlock } from '@/components/SquareButtonBlock/SquareButtonBlock'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import s from './LangsPageBuilder.module.css'

export const LangsPageBuilder = () => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<SearchBar />
					<PageCommonInfo
						title='Языки программирования'
						description='Этот раздел посвящен справочникам по популярным языкам программирования на сегоднящний день. У нас вы всегда сможете найти актуальную и полезную информацию'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Языки программирования", navigationUrl: "/langs" }]}
					/>
					<section className={s.section}>
						<h3 className={s.section__title}>Языки программирования</h3>
						<div className={s.langs}>
							<SquareButtonBlock imageUrl='/assets/Langs/js.png' navigationUrl='/langs/javascript' title='JavaScript' />
							<SquareButtonBlock imageUrl='/assets/Langs/python.png' navigationUrl='/langs/python' title='Python' />
							<SquareButtonBlock imageUrl='/assets/Langs/rust.png' navigationUrl='/langs/rust' title='Rust' labelTitle='Дополняется' />
							<SquareButtonBlock imageUrl='/assets/Langs/golang.png' navigationUrl='/langs/golang' title='Golang' />
						</div>
					</section>
					<section className={s.section}>
						<h3 className={s.section__title}>Технологии</h3>
						<div className={s.langs}>
							<SquareButtonBlock imageUrl='/assets/Langs/js.png' navigationUrl='/langs/javascript' title='JavaScript' />
							<SquareButtonBlock imageUrl='/assets/Langs/python.png' navigationUrl='/langs/python' title='Python' />
							<SquareButtonBlock imageUrl='/assets/Langs/rust.png' navigationUrl='/langs/rust' title='Rust' labelTitle='Дополняется' />
							<SquareButtonBlock imageUrl='/assets/Langs/golang.png' navigationUrl='/langs/golang' title='Golang' />
						</div>
					</section>
				</Container>
			</div>
		</Layout>
	)
}
