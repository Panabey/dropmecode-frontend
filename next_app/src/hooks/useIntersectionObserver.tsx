/* eslint react-hooks/rules-of-hooks: 0 */
import { useCallback, useEffect, useRef } from "react";

export const useIntersectionObserver = (refObj: any, callback: (intersectedObj: any) => void, customOptions?: any,) => {

	const observer = useRef<IntersectionObserver | null>(null);

	if (typeof document === 'undefined') {
		return { reObserve }
	}

	const OPTIONS = {
		rootMargin: "20px",
		threshold: 0.2,
	};

	const onIntersected = useCallback((entries: any[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				callback(entry.target);
				observer?.current?.unobserve(entry.target)
			}
		});
	}, [callback])

	useEffect(() => {
		observer.current = new IntersectionObserver(onIntersected, { ...OPTIONS, ...customOptions })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customOptions, onIntersected]);

	function reObserve(element: any) {
		if (element !== null) {
			observer?.current?.observe(element)
		}
	}

	useEffect(() => {
		if (refObj.current !== null) {
			observer?.current?.observe(refObj.current)
		}

		return () => {
			if (refObj.current !== null) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer?.current?.unobserve(refObj.current)
			}
		}
	}, [observer, refObj])

	return { reObserve }
}