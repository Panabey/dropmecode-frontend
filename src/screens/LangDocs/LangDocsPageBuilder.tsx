import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PartitionInfo } from '@/components/PartitionInfo/PartitionInfo'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { iLangInfo } from '@/pages/langs/[id]'
import { useRouter } from 'next/router'
import { FC } from 'react'
import getSlug from 'speakingurl'
import s from './LangDocsPageBuilder.module.css'

interface iProps {
	langInfo: iLangInfo
}

export const LangDocsPageBuilder: FC<iProps> = ({ langInfo }) => {
	const router = useRouter()
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<PageCommonInfo
						title={langInfo.title}
						description={langInfo.description}
						breadcrumbs={[
							{ title: "Главная", navigationUrl: "/" },
							{ title: "Справочники", navigationUrl: "/langs" },
							{ title: langInfo.title, navigationUrl: "/langs/" + router.query.id }
						]}
					/>
					{langInfo.content.length && langInfo.content.map((content) => {
						return (
							<PartitionInfo
								key={content.title}
								partNumber={Number(content.title.split(' ')[0])}
								title={content.title.split(' ').filter((_, idx) => idx !== 0).join(' ')}
								description={content.description}
								links={content.page.map((link) => {
									return {
										navigationUrl: '/langs/' + router.query.id + `/${link.id}-${getSlug(link.title.split(' ').filter((_, idx) => idx !== 0).join('').toLowerCase(), { lang: 'ru' })}`,
										partnumber: link.title.split(' ')[0],
										title: link.title.split(' ').filter((_, idx) => idx !== 0).join(' ')
									}
								})}
								className={s.partition__info}
							/>
						)
					})}
				</Container>
			</div>
		</Layout>
	)
}
