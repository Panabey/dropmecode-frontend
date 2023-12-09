import { RsyaBlock } from '@/components/RsyaBlock/RsyaBlock'
import { iPageLink } from '@/hooks/useHeadingsNavigation'
import classNames from 'classnames'
import { FC } from 'react'
import s from './LangDocsRightSidebar.module.css'

interface iProps {
	navigationLinks: iPageLink[]
}

export const LangDocsRightSidebar: FC<iProps> = ({ navigationLinks }) => {

	return (
		<div className={s.sidebar}>
			<div className={s.block}>
				<h4 className={s.block__title}>На этой странице</h4>
				<div className={s.block__column}>
					{navigationLinks.map((link) => {
						return (
							<a href={link.anchor} className={classNames(s.block__link, { [s.active]: link.active })} key={link.anchor}>{link.title}</a>
						)
					})}
				</div>
			</div>
			<div className={classNames(s.block, s.block_rsya)}>
				<RsyaBlock
					blockId='yandex_rtb_R-A-3621775-3'
					codeBlock='
					window.yaContextCb.push(()=>{
						Ya.Context.AdvManager.render({
							"blockId": "R-A-3621775-3",
							"renderTo": "yandex_rtb_R-A-3621775-3"
						})
					})
					'
				/>
			</div>
		</div>
	)
}
