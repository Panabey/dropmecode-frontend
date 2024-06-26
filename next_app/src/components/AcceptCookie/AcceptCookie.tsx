import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import s from "./AcceptCookie.module.css"


export const AcceptCookie = () => {
	const ref = useRef<Element | null>(null)
	const [mounted, setMounted] = useState<boolean>(false)

	const [cookieAccept, setCookieAccept] = useState<boolean>(false)

	if (mounted && window.localStorage.getItem('accept_cookie') === 'true') {
		if (!cookieAccept) {
			setCookieAccept(true)
		}
	}

	function onClickAccept() {
		if (typeof window !== 'undefined') {
			setCookieAccept(true)
			window.localStorage.setItem('accept_cookie', 'true')
			//@ts-ignore
			window[`disableYaCounter${String(process.env.NEXT_PUBLIC_YMETRICA_NUMBER)}`] = false
			window.localStorage.setItem('nometrica', 'false')
			return
		}
	}

	useEffect(() => {
		ref.current = document.querySelector<HTMLElement>("#cookie")
		setMounted(true)
	}, [])

	return (mounted && ref.current)
		? createPortal(
			!cookieAccept
				? <div className={s.cookie}>
					<Image width={512} height={512} alt='Куки иконка' src={'/assets/Cookie/cookie_1.png'} className={s.icon} />
					<span className={s.text}>Наши разработчики, сказали, что отключат сервер, если им не
						принесут сгущёнки, но мы можем её принести только если вы <Link href="/cookies">разрешите нужные нам cookie файлы</Link> </span>
					<button className={s.button} onClick={onClickAccept}>Разрешаю</button>
				</div>
				: <></>
			, ref.current)
		: null
}