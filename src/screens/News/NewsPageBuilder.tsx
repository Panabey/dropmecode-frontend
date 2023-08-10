import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import s from './NewsPageBuilder.module.css'
import { NewsPreview } from './components/NewsPreview'

export const NewsPageBuilder = () => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<SearchBar />
					<PageCommonInfo
						title='Новости'
						description='В этом разделе вы всегда можете прочитать интересные новости из мира IT и технологий. Мы тщательно отбираем материал и компилируем только интересные новости :)'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Новости", navigationUrl: "/news" }]}
					/>
					<div className={s.news}>
						<NewsPreview
							slug='ishodniky-linux-yadra-slili-v-seti'
							title='Исходники ядра Linux слили в сеть'
							dateTime='10.08.2023 20:05'
							description='Сегодня стало известно, что исходики ядра опеционной системы - Linux, утекли в сеть. Пользователям стала доступна вся кодовая база проекта. Утечку уже подтвердил автор ядра - Линус Торвальдс'
							imageUrl='https://xakep.ru/wp-content/uploads/2018/09/186231/Linus-Torvalds.jpg'
							tags={["Кибербезопасность", "Софт", "Утечки данных"]}
						/>
						<NewsPreview
							slug='mikhail-kuligin-napisal-assembler-na-assemblere'
							title='Михаил Кулигин написал ассемблер на ассемблере'
							dateTime='05.07.2023 14:14'
							description='Известный в узких кругах дедос под кодовым именем - "dedosAtaka", написал новый язык программирования на старом, впрочем как и он сам.'
							imageUrl='https://sun9-37.userapi.com/impg/QRPqfuhW_pKdq9yEhpxlVTQgdAnHUXyACfcgMA/V-cmNLao1Mc.jpg?size=992x992&quality=95&sign=efc80efca27da7ca3fcf3307a977e25e&type=album'
							tags={["Программирование", "Софт"]}
						/>
						<NewsPreview
							slug='znamenitie-programmisty-iz-muroma-stali-deputatami'
							title='Знаменитые программисты из Мурома стали депутатами'
							dateTime='05.07.2023 14:14'
							description='Как сообщают последние события, знаменитые программисты из МиВЛГУ в г.Муром, переквалифицировались в депутатов государственной думы'
							imageUrl='https://sun9-59.userapi.com/impg/VCW8GV2yvCS4Gh-BGSSOFQtkmfvRGghJAQR6ZA/Q5n9CRrEjNw.jpg?size=1280x960&quality=95&sign=7116e46bdbcfba6f3b3711b9bc84ecfc&type=album'
							tags={["IT", "Политика", "Достопримечательности"]}
						/>
					</div>
				</Container>
			</div>
		</Layout>
	)
}
