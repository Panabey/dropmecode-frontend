import { Container } from '@/components/Container/Container'
import { Layout } from '@/components/Layout/Layout'
import { PageCommonInfo } from '@/components/PageCommonInfo/PageCommonInfo'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import s from './ArticlesListPageBuilder.module.css'
import { ArticlesListPreview } from './components/ArticlesListPreview'

export const ArticlesListPageBuilder = () => {
	return (
		<Layout className={s.layout}>
			<SidebarMenu />
			<div className={s.area}>
				<Container className={s.container}>
					<PageCommonInfo
						title='Статьи'
						description='В этом разделе вы всегда можете прочитать интересные статьи из мира IT и технологий. Мы тщательно отбираем материал и компилируем только интересные статьи, некоторые пишем сами с нуля :)'
						breadcrumbs={[{ title: "Главная", navigationUrl: "/" }, { title: "Статьи", navigationUrl: "/articles" }]}
					/>
					<div className={s.news}>
						<ArticlesListPreview
							slug='ishodniky-linux-yadra-slili-v-seti'
							title='Исходники ядра Linux слили в сеть'
							dateTime='10.08.2023 20:05'
							description='Сегодня стало известно, что исходики ядра опеционной системы - Linux, утекли в сеть. Пользователям стала доступна вся кодовая база проекта. Утечку уже подтвердил автор ядра - Линус Торвальдс'
							imageUrl='https://xakep.ru/wp-content/uploads/2018/09/186231/Linus-Torvalds.jpg'
							tags={["Кибербезопасность", "Софт", "Утечки данных"]}
						/>
						<ArticlesListPreview
							slug='sarmat-mobil-otpravilsa-v-turne'
							title='"Сармат-мобиль" с ядерной боеголовкой отправился в турне по России'
							dateTime='11.05.2023 12:25'
							description='Самый современный автомобиль с установленной на крыше ядерной боеголовкой, отправился покорять отечественные города в качестве арт-объекта'
							tags={["Автомобили", "Технологии"]}
						/>
						<ArticlesListPreview
							slug='mikhail-kuligin-napisal-assembler-na-assemblere'
							title='Михаил Кулигин написал ассемблер на ассемблере'
							dateTime='05.07.2023 14:14'
							description='Известный в узких кругах дедос под кодовым именем - "dedosAtaka", написал новый язык программирования на старом, впрочем как и он сам.'
							imageUrl='https://sun9-37.userapi.com/impg/QRPqfuhW_pKdq9yEhpxlVTQgdAnHUXyACfcgMA/V-cmNLao1Mc.jpg?size=992x992&quality=95&sign=efc80efca27da7ca3fcf3307a977e25e&type=album'
							tags={["Программирование", "Софт"]}
						/>
						<ArticlesListPreview
							slug='v-rossii-postupil-v-prodazhu-elbrus-shestnadcath-s'
							title='В России поступил в продажу Эльбрус 16С'
							dateTime='04.06.2023 18:19'
							description='Самый мощный процессор из линейки "Эльбрус" теперь доступен к прямой продаже. 16 высокопроизводительных ядер способны обработать любые серверные задачи'
							tags={["Технологии", "Железо"]}
						/>
						<ArticlesListPreview
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
