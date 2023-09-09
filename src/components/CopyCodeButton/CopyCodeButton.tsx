import classNames from 'classnames';
import { FC, ReactNode, useState } from 'react';
import { HiOutlineClipboardDocumentCheck, HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import s from './CopyCodeButton.module.css';

interface iProps {
	children: ReactNode
}

export const CopyCodeButton: FC<iProps> = ({ children }) => {

	const [isCopied, setIsCopied] = useState(false);

	const handleClick = () => {
		navigator.clipboard.writeText((children as any)[0].props.children[0]);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 3000);
	}
	return (
		<div className={classNames(s.copy, { [s.copied]: isCopied }, { [s.nocopied]: !isCopied })} onClick={handleClick}>
			{
				!isCopied
					? <HiOutlineClipboardDocumentList color="#000" size={25} />
					: <HiOutlineClipboardDocumentCheck color="#1DC989" size={25} />
			}
		</div>
	)
}