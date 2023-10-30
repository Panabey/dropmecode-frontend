import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { HeaderMobile } from '@/components/HeaderMobile/HeaderMobile'
import { SITE_URL } from '@/lib/constants'
import Image from 'next/image'
import s from './NotFound404PageBuilder.module.css'

export const NotFound404PageBuilder = () => {
  return (
    <div>
      <Header />
      <HeaderMobile />
      <div className={s.area}>
        <div className={s.error}>
          <Image width={626} height={626} alt="Картинка ошибки" src='/assets/Error/404.svg' className={s.image} />
          <h2 className={s.title}>Упс. Страницы не существует</h2>
          <p className={s.description}>Вы перешли на страницу, которой не существует на нашем сайте. Пожалуйста перейдите на другую страницу</p>
          <button
            className={s.button}
            type="button"
            onClick={() => window.location.href = String(SITE_URL)}
          >
            На главную
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
