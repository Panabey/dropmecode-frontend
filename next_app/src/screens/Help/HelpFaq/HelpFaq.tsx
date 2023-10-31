import { Accordeon } from '@/components/Accordeon/Accordeon'
import s from './HelpFaq.module.css'

export const HelpFaq = () => {
	return (
		<div className={s.faq}>
			<h3 className={s.faq__title}>Часто задаваемые вопросы</h3>
			<h4 className={s.faq__subtitle}>Возможно на ваш вопрос уже есть ответ. Поищите его в этом разделе</h4>
			<div className={s.questions}>
				<Accordeon
					title='Зачем нам нужны cookie файлы?'
					description='Для нашего проекта используются cookie файлы, позволяющие следить за активностью проекта 
					его посещаемостью, охвату устройств и прочих различных метрик. Проект не требует пользовательских данных, которые
					однозначно могли бы его идентифицировать, поэтому за свою безопасность Вы можете быть спокойны.'
				/>
				<Accordeon
					title='Я разрешил cookie-файлы, но разработчикам не дали сгущёнки. Что делать?'
					description='Не беспокойтесь. Как только проект, благодаря доходам с рекламы сможет окупать аренду оборудования, 
					на котором он запущен, мы обязательно купим по банке сгущёнки и с удовольствием её скушаем :)'
				/>
				<Accordeon
					title='Я нашёл ошибку или неточность в справочнике. Куда обратиться?'
					description='Самым быстрым способом будет написать нам в группу ВКонтакте, описав, где конкретно (желательно со скриншотами) вы нашли проблему
					 и правильный на ваш взгляд вариант того, как материал должен выглядеть'
				/>
				<Accordeon
					title='Я хочу предложить свою идею.'
					description='Напишите в наше сообщество ВК, в раздел &#8220;Предложения по улучшению проекта&#8221;. Мы получим ваше обращение и рассмотрим его в кратчайшие сроки.'
				/>
			</div>
		</div>
	)
}
