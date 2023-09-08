export function capitalizeString(str: string): string {
	return str[0].toUpperCase() + str.slice(1)
}
export function splitText(str: string, length: number): string {
	if (typeof str === 'string') {
		if (str.length <= length) {
			return str
		}
	} else {
		return ''
	}
	return str.slice(0, length)
}