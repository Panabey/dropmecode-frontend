import { Container } from '@/components/Container/Container'
import { PageArea } from '@/components/PageArea/PageArea'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import Link from 'next/link'
import s from './TermsOfUsePageBuilder.module.css'

export const TermsOfUsePageBuilder = () => {
	return (
		<PageLayout className={s.layout}>
			<PageArea>
				<div></div>
				<Container className={s.container}>
					<PageCommonInfo
						title='Условия пользования сайтом'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Условия пользования сайтом", navigationUrl: "/terms-of-use" }]}
					/>
					<div className={s.document}>
						<time className={s.time}>Дата обновления: 20.10.2023</time>

						<p className={s.row}>Пожалуйста, внимательно ознакомьтесь с данными Условиями Пользования перед тем, как  начать использовать сайт &#8220;Справочный Материал по Языкам Программирования&#8221; (далее - &#8220;Сайт&#8221;). </p>
						<p className={s.row}>Нажимая на &#8220;Разрешить&#8221; во всплывающем окне о Cookie-файлах или используя Сайт, вы соглашаетесь с условиями, изложенными ниже.</p>

						<h3 className={s.subtitle}>Определения</h3>
						<h4 className={s.term}>Сайт</h4>
						<p className={s.row}>Сайт - это веб-сайт dropmecode.ru, разрабатываемый независимой группой разработчиков.</p>

						<h3 className={s.subtitle}>1. ПРИНЯТИЕ УСЛОВИЙ</h3>
						<p className={s.row}>Пользование Сайтом подразумевает ваше полное согласие с этими Условиями Пользования. Если вы не согласны с этими Условиями, пожалуйста, не используйте Сайт.</p>

						<h3 className={s.subtitle}>2. ИНФОРМАЦИЯ НА САЙТЕ</h3>
						<p className={s.row}>Сайт предоставляет справочный материал по языкам программирования и связанным темам. </p>
						<p className={s.row}>Эта информация предоставляется исключительно в информационных целях и не должна рассматриваться как консультации по программированию. </p>
						<p className={s.row}>Сайт не несёт ответственности за любые последствия, возникающие из использования предоставленной информации.</p>

						<h3 className={s.subtitle}>3. ПРАВА И ОГРАНИЧЕНИЯ</h3>
						<h4 className={s.term}>Авторские права.</h4>
						<p className={s.row}>Весь контент на Сайте защищён авторскими правами. </p>
						<p className={s.row}>Вы можете использовать этот контент только для личных и некоммерческих целей.</p>
						<p className={s.row}>Запрещается копирование, распространение и модификация контента без разрешения правообладателей.</p>
						<h4 className={s.term}>Пользование.</h4>
						<p className={s.row}>При использовании Сайта вы обязуетесь не нарушать действующее законодательство и не создавать вредное, оскорбительное поведение, или неправомерный контент.</p>
						<p className={s.row}>Запрещается использование Сайта для распространения вредоносного программного обеспечения или для нарушения безопасности.</p>

						<h3 className={s.subtitle}>4. ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ</h3>
						<p className={s.row}>Сайт предоставляется &#8220;как есть&#8221;.</p>
						<p className={s.row}> Мы не гарантируем точность, надежность или доступность информации на Сайте.</p>
						<p className={s.row}> Мы также не несем ответственности за потерю данных, вред программному обеспечению, или любые другие убытки, возникшие в результате использования Сайта.</p>

						<h3 className={s.subtitle}>5. ССЫЛКИ НА СТОРОННИЕ САЙТЫ</h3>
						<p className={s.row}>Сайт может содержать ссылки на сторонние веб-сайты.</p>
						<p className={s.row}>Мы не контролируем и не несём ответственности за содержание или политику конфиденциальности данных сторонних сайтов.</p>

						<h3 className={s.subtitle}>6. ИЗМЕНЕНИЕ УСЛОВИЙ</h3>
						<p className={s.row}>Мы оставляем за собой право в любое время изменить данные Условия Пользования. </p>
						<p className={s.row}>Изменения вступают в силу с момента их публикации на Сайте. Пожалуйста, периодически проверяйте Условия Пользования.</p>
						<br />
						<p className={s.row}>Свяжитесь с нами по адресу <Link href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</Link> для вопросов или комментариев относительно Условий Пользования Сайта dropmecode.ru.</p>
						<h3 className={s.subtitle}>7. СБОР ДАННЫХ</h3>
						<p className={s.row}>Сайт собирает пользовательские данные для аналитики в файлы &#8220;cookie&#8221;. </p>
						<p className={s.row}>Если вы хотите прочитать о том, какие данные собираются и как отключить их сбор (при необходимости), можете перейти на <Link href={`/cookies`}>СТРАНИЦУ О COOKIE ФАЙЛАХ</Link></p>
					</div>
				</Container>
				<div></div>
			</PageArea>
		</PageLayout>
	)
}
