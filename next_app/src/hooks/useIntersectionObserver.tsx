/* eslint react-hooks/rules-of-hooks: 0 */
import { useEffect } from "react";

export const useIntersectionObserver = (refObj: any, callback: (intersectedObj: any) => void, customOptions?: any,) => {

	if (typeof document === 'undefined') {
		return { reObserve }
	}

	let OPTIONS = {
		rootMargin: "20px",
		threshold: 0.2,
	};

	let observer = new IntersectionObserver(onIntersected, { ...OPTIONS, ...customOptions });

	function onIntersected(entries: any[]) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				callback(entry.target);
				observer.unobserve(entry.target)
			}
		});
	}

	function reObserve(element: any) {
		if (element !== null) {
			observer.observe(element)
		}
	}

	useEffect(() => {
		if (refObj.current !== null) {
			observer.observe(refObj.current)
		}

		return () => {
			if (refObj.current !== null) {
				observer.unobserve(refObj.current)
			}
		}
	}, [refObj])

	return { reObserve }
}