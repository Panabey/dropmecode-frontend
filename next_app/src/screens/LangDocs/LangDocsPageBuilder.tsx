import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { PartitionInfo } from '@/components/PartitionInfo/PartitionInfo'
import { iLangInfo } from '@/pages/langs/[id]'
import { useRouter } from 'next/router'
import { FC } from 'react'
import getSlug from 'speakingurl'
import s from './LangDocsPageBuilder.module.css'
import { LangDocsRightSidebar } from './components/LangDocsRightSidebar/LangDocsRightSidebar'

interface iProps {
	langInfo: iLangInfo
}

export const LangDocsPageBuilder: FC<iProps> = ({ langInfo }) => {
	const router = useRouter()

	return (
		<PageLayout className={s.layout}>
			<PageArea>
				<div className={s.filler}></div>
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
								partNumber={Number(content.part)}
								title={content.title}
								description={content.description}
								links={content.page.map((link) => {
									return {
										navigationUrl: '/langs/' + router.query.id + `/${link.id}-${getSlug(link.title.toLowerCase(), { lang: 'ru' })}`,
										partnumber: (content.part + '.' + link.subpart + '. '),
										title: link.title
									}
								})}
								className={s.partition__info}
							/>
						)
					})}
				</Container>
				<LangDocsRightSidebar books={langInfo.books} />
			</PageArea>
		</PageLayout>
	)
}
