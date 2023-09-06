import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import s from "./AcceptCookie.module.css"


export const AcceptCookie = () => {
	const ref = useRef<Element | null>(null)
	const [mounted, setMounted] = useState<boolean>(false)

	const [cookieAccept, setCookieAccept] = useState<boolean>(false)

	if (mounted && window.localStorage.getItem('accept_cookie') === 'true') {
		if(!cookieAccept){
			setCookieAccept(true)
		}
	}

	function onClickAccept() {
		if (typeof window !== 'undefined') {
			setCookieAccept(true)
			window.localStorage.setItem('accept_cookie', 'true')
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
					<span className={s.text}>Наши разработчики, сказали, что отключат сервер, если им не
						принесут сгущёнки, но мы можем её принести только если вы <Link href="/coookies">разрешите нужные нам cookie файлы</Link> </span>
					<button className={s.button} onClick={onClickAccept}>Разрешаю</button>
				</div>
				: <></>
			, ref.current)
		: null
}