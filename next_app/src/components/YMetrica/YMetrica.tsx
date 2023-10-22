import { useRouter } from "next/router"
import { useEffect } from "react"

export const YMetrica = () => {

	const router = useRouter()

	useEffect(() => {
		if (typeof window !== undefined) {
			if (Boolean(JSON.parse(window.localStorage.getItem('accept_cookie') || 'null')) === false) {
				//@ts-ignore
				window[`disableYaCounter${String(process.env.NEXT_PUBLIC_YMETRICA_NUMBER)}`] = true
				return
			}
			const nometrica = Boolean(JSON.parse(window.localStorage.getItem('nometrica') || 'null'))
			//@ts-ignore
			window[`disableYaCounter${String(process.env.NEXT_PUBLIC_YMETRICA_NUMBER)}`] = nometrica
		}
	}, [router])

	return (
		<></>
	)
}
