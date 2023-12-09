import { Container } from '@/components/Container/Container'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SquareButtonBlock } from '@/components/SquareButtonBlock/SquareButtonBlock'
import { iHandbookPageInfo } from '@/pages/langs'
import { FC } from 'react'
//import { SiMoleculer } from 'react-icons/si'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { UPLOADS_URL } from '@/lib/constants'
import s from './LangsPageBuilder.module.css'

interface iProps {
	handbooks: iHandbookPageInfo[]
}

export const LangsPageBuilder: FC<iProps> = ({ handbooks }) => {
	return (
		<PageLayout className={s.layout}>
			<PageArea>
				<div className={s.filler}></div>
				<Container className={s.container}>
					<PageCommonInfo
						title='Справочники по языкам'
						description='Этот раздел посвящен справочникам по популярным языкам программирования на сегоднящний день. У нас вы всегда сможете найти актуальную и полезную информацию'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Справочники", navigationUrl: "/langs" }]}
					/>
					{handbooks.map((theme) => {
						return (
							<section className={s.section} key={theme.title}>
								<h3 className={s.section__title}>{theme.title}</h3>
								<div className={s.langs}>
									{theme.handbook.map((handbook) => {
										return (
											<SquareButtonBlock
												key={handbook.id}
												className={s.lang}
												labelTitle={handbook.status && handbook.status.title.length ? handbook.status.title : ''}
												labelBgColor={handbook.status && handbook.status.color_background.length ? handbook.status.color_background : ''}
												labelColor={handbook.status && handbook.status.color_text.length ? handbook.status.color_text : ''}
												imageUrl={UPLOADS_URL + handbook.logo_url}
												navigationUrl={`/langs/${handbook.slug}`}
												title={handbook.title} />
										)
									})}
								</div>
							</section>
						)
					})}
					{/* <section className={s.section}>
						<h3 className={s.section__title}><SiMoleculer fill="#1F477D" size={25} /> Технологии</h3>
						<div className={s.langs}>
							<SquareButtonBlock imageUrl='/assets/Langs/nextjs.png' navigationUrl='/techs/nextjs' title='NextJS' />
							<SquareButtonBlock imageUrl='/assets/Langs/django.png' navigationUrl='/techs/django' title='Django' labelTitle='Обновлено' labelColor='#FFF' labelBgColor="#26AA78" />
							<SquareButtonBlock imageUrl='/assets/Langs/expressjs.png' navigationUrl='/techs/expressjs' title='ExpressJS' />
						</div>
					</section> */}
				</Container>
				<div></div>
			</PageArea>
		</PageLayout>
	)
}
