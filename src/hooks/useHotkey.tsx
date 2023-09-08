import { useEffect } from "react"

export const useHotkey = (clampedKey: 'ctrl' | 'shift' | 'alt', keyCode: string, onPressed: () => void, deps?: any[]) => {
	useEffect(() => {
		function onPressKey(event: KeyboardEvent) {
			if (clampedKey === 'alt' && event.altKey && event.code === keyCode) {
				event.preventDefault()
				onPressed()
				return;
			}
			if (clampedKey === 'shift' && event.shiftKey && event.code === keyCode) {
				event.preventDefault()
				onPressed()
				return;
			}
			if (clampedKey === 'ctrl' && event.ctrlKey && event.code === keyCode) {
				event.preventDefault()
				onPressed()
				return;
			}
		}

		document.addEventListener('keydown', onPressKey, false)

		return () => {
			document.removeEventListener('keydown', onPressKey, false)
		}
	}, [deps])
}