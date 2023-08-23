import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { SquareButtonBlock } from '@/components/SquareButtonBlock/SquareButtonBlock'
import { iHandbook } from '@/pages/langs'
import { FC } from 'react'
import { HiCode } from 'react-icons/hi'
//import { SiMoleculer } from 'react-icons/si'
import { UPLOADS_URL } from '@/lib/constants'
import getSlug from 'speakingurl'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import s from './LangsPageBuilder.module.css'

interface iProps {
	handbooks: iHandbook[]
}

export const LangsPageBuilder: FC<iProps> = ({ handbooks }) => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<PageCommonInfo
						title='Языки программирования'
						description='Этот раздел посвящен справочникам по популярным языкам программирования на сегоднящний день. У нас вы всегда сможете найти актуальную и полезную информацию'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Языки программирования", navigationUrl: "/langs" }]}
					/>
					<section className={s.section}>
						<h3 className={s.section__title}><HiCode size={25} fill="#1F477D" /> Языки программирования</h3>
						<div className={s.langs}>
							{handbooks.map((handbook) => {
								return (
									<SquareButtonBlock labelTitle={handbook.status && handbook.status.length ? handbook.status : ''} key={handbook.id} imageUrl={UPLOADS_URL + handbook.logo_url} navigationUrl={`/langs/${getSlug(handbook.title, { lang: 'ru' })}`} title='JavaScript' />
								)
							})}
						</div>
					</section>
					{/* <section className={s.section}>
						<h3 className={s.section__title}><SiMoleculer fill="#1F477D" size={25} /> Технологии</h3>
						<div className={s.langs}>
							<SquareButtonBlock imageUrl='/assets/Langs/nextjs.png' navigationUrl='/techs/nextjs' title='NextJS' />
							<SquareButtonBlock imageUrl='/assets/Langs/django.png' navigationUrl='/techs/django' title='Django' labelTitle='Обновлено' labelColor='#FFF' labelBgColor="#26AA78" />
							<SquareButtonBlock imageUrl='/assets/Langs/expressjs.png' navigationUrl='/techs/expressjs' title='ExpressJS' />
						</div>
					</section> */}
				</Container>
			</div>
		</Layout>
	)
}
