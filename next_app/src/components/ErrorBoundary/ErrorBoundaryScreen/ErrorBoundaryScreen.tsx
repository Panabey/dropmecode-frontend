import { SITE_URL } from '@/lib/constants'
import Image from 'next/image'
import { FC } from 'react'
import s from './ErrorBoundaryScreen.module.css'

interface iProps {
	error: any
	requestType: string
}

const ErrorBoundaryScreen: FC<iProps> = ({ error, requestType }) => {
	return (
		<div className={s.area}>
			<div className={s.error}>
				<Image width={626} height={626} alt="Картинка ошибки" src='/assets/Error/errorBoundary.jpg' className={s.image} />
				<h2 className={s.title}>Упс. Похоже произошла ошибка</h2>
				<p className={s.description}>В работе наших сервисов произошла непредвиденная ошибка. Перезагрузите страницу или зайдите на неё позднее.
					Возможно сейчас на сервере проводятся технические работы</p>
				{
					//@ts-ignore
					error && error.message
						? <aside className={s.error__reason}>
							{/* @ts-ignore */}
							{error.message}
						</aside>
						: <></>
				}
				<button
					className={s.button}
					type="button"
					onClick={() => window.location.href = String(SITE_URL)}
				>
					На главную
				</button>
			</div>
			<footer className={s.footer}>Тип ошибки: {requestType}</footer>
		</div>
	)
}

export default ErrorBoundaryScreen