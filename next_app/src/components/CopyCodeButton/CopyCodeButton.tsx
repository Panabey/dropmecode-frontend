import classNames from 'classnames';
import { FC, ReactNode, useState } from 'react';
import { GoCheckbox, GoCopy } from 'react-icons/go';
import s from './CopyCodeButton.module.css';

interface iProps {
	children: ReactNode
}

export const CopyCodeButton: FC<iProps> = ({ children }) => {

	const [isCopied, setIsCopied] = useState(false);

	const handleClick = () => {
		navigator.clipboard.writeText((children as any).props.children);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 3000);
	}
	return (
		<div className={s.copy} onClick={handleClick}>
			<aside className={classNames(s.text, { [s.copied]: isCopied }, { [s.nocopied]: !isCopied })}>Скопировано!</aside>
			<div className={classNames(s.icon, { [s.copied]: isCopied }, { [s.nocopied]: !isCopied })}>
				{
					!isCopied
						? <GoCopy color="#000" size={20} />
						: <GoCheckbox color="#1DC989" size={20} />
				}
			</div>
		</div>
	)
}