import { RsyaBlock } from '@/components/RsyaBlock/RsyaBlock'
import classNames from 'classnames'
import s from './ArticlesListRightSidebar.module.css'

export const ArticlesListRightSidebar = () => {
	return (
		<div className={s.sidebar}>
			<div className={classNames(s.block, s.block_rsya)}>
				<RsyaBlock
					blockId='yandex_rtb_R-A-3621775-5'
					codeBlock='window.yaContextCb.push(()=>{
						Ya.Context.AdvManager.render({
							"blockId": "R-A-3621775-5",
							"renderTo": "yandex_rtb_R-A-3621775-5"
						})
					})'
				/>
			</div>
		</div>
	)
}
