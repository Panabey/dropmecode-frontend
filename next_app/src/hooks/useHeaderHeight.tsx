import { useEffect, useState } from 'react';

export const useHeaderHeight = () => {
	const [headerHeight, setHeaderHeight] = useState<number>(0);

	useEffect(() => {
		setHeaderHeight(document.querySelector('.header')?.clientHeight || 0);
	}, [])

	return headerHeight
}