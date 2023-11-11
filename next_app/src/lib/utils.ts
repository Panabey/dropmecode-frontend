export function capitalizeString(str: string): string {
	return str[0].toUpperCase() + str.slice(1)
}
export function splitText(str: string, length: number, endString?: string): string {
	if (typeof str === 'string') {
		if (str.length <= length) {
			return str
		}
	} else {
		return ''
	}
	return str.slice(0, length) + (endString ? endString : '')
}

export function getScreenWidthPercent(percent: number): number {
	if (typeof window === 'undefined') {
		return 0;
	}
	return Math.floor(window.screen.width / 100 * percent)
}
export function getScrollWindowPercentage() {
	const h = document.documentElement,
		b = document.body,
		st = 'scrollTop',
		sh = 'scrollHeight';
	return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}