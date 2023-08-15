import { q1md, q2md, q3md } from "@/lib/mdquiz"
import { QuizPageBuilder } from "@/screens/Quiz/QuizPageBuilder"
import { iQuizQuestion } from "@/screens/Quiz/QuizQuestion/QuizQuestion"

const questions: iQuizQuestion[] = [
	{
		id: 1,
		title: "Что будет выведено в консоль?",
		hint: "Вспомните, как работают ссылочные типы данных в JS",
		markdown: q1md,
		answers: [
			{
				id: 1,
				title: "В консоли будет ошибка",
				is_correct: false,
				explanation: "Код написан полностью корректно, по стандарту EcmaScript6 и не содержит ошибок"
			},
			{
				id: 2,
				title: "В консоли будет выведено: ded",
				is_correct: true,
				explanation: "Действительно. Так как 'a' - это объект, его внутренние пары ключ-значение хранятся как ссылки на память и при создании объекта 'b', у него сохраняются ссылки на область памяти объекта 'a', поэтому объект 'a' и переопределяется"
			},
			{
				id: 3,
				title: "В консоли будет выведено: js",
				is_correct: false,
				explanation: "Неверно. Почитайте учебный материал по теме ссылочных типов данных в JavaScript и возвращайтесь к квизу позже :)"
			},
		],
	},
	{
		id: 2,
		title: "Посмотрите на картинку и найдите ошибку",
		hint: "Вспомните, как можно обьявлять функции в Javascript",
		markdown: q2md,
		answers: [
			{
				id: 1,
				title: "Код корректный, ошибок нет",
				is_correct: true,
				explanation: "Это верный ответ. Из функций в Javasript можно получить экземпляры. Это довольно редко используемый синтаксис, но возможный"
			},
			{
				id: 2,
				title: "Из функции нельзя получить экземпляр",
				is_correct: false,
				explanation: "Неверно. Такой вариант обявления функций допускается"
			},
			{
				id: 3,
				title: "Ошибка синтаксическая, в написании текста",
				is_correct: false,
				explanation: "Неверно. В EcmaScript 5 такой вариант обьявления функций доступен к написанию. Почитайте материал про функции-конструкторы"
			},
		],
	},
	{
		id: 3,
		title: "Что будет храниться в переменной 'X'?",
		hint: "Вспомните, как работает явное преобразование типов JS",
		markdown: q3md,
		answers: [
			{
				id: 1,
				title: "true",
				is_correct: false,
				explanation: "Верно, так как пустая строка в JavaScript приводится к boolean как false значение"
			},
			{
				id: 2,
				title: "false",
				is_correct: true,
				explanation: "Неверно. Изучите подробнее материал про преобразование типов в Javascript"
			},
			{
				id: 3,
				title: "Преобразование типов таким образом невозможно",
				is_correct: false,
				explanation: "Неверно. Такой вариант преобразования типов допускается и довольно часто используется разработчиками"
			},
		],
	},
]


const QuizPage = () => {
	return (
		<QuizPageBuilder questions={questions} />
	)
}
export default QuizPage