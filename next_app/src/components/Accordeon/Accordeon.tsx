import { FC, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import s from './Accordeon.module.css'
import classNames from 'classnames'

interface iProps {
	title: string
	description: string
}

export const Accordeon: FC<iProps> = ({ title, description }) => {

	const [isOpened, setIsOpened] = useState<boolean>(false)

	const ref = useRef<HTMLDivElement | null>(null)

	return (
		<div className={s.accordeon}>
			<div className={s.accordeon__head} onClick={() => setIsOpened((prev) => !prev)}>
				<h5 className={s.title}>
					{title}
				</h5>
				<IoIosArrowDown fill="#000" className={classNames(s.arrow, {[s.opened]: isOpened})} />
			</div>
			<div className={s.accordeon__body} style={{ maxHeight: isOpened && ref.current ? (ref.current.clientHeight + 'px') : '0' }}>
				<div className={s.description} ref={ref}>
					{description}
				</div>
			</div>
		</div>
	)
}
