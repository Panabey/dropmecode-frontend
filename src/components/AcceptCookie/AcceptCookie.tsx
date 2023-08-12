import { useState } from 'react';
import ReactDOM from 'react-dom';
import s from './AcceptCookie.module.css';

export const AcceptCookie = () => {

	const [isOpenedCookie, setIsOpenedCookie] = useState<boolean>(true);

	if (typeof window === undefined) {
		return <></>
	}

	if (isOpenedCookie) {
		return ReactDOM.createPortal(
			<div
				className={s.cookie}
			>
				dedos
			</div>,
			document.querySelector('#cookie') as Element
		)
	} else {
		return <></>
	}
}
