export interface iQuizQuestionAnswer {
	id: number
	text: string
	is_correct?: boolean
	explanation?: string
}

export function isCorrectAnswer(selectedAnswers: iQuizQuestionAnswer[], answer: iQuizQuestionAnswer) {
	const findedAnswer = selectedAnswers.find((selectedAnswer) => selectedAnswer.id === answer.id)
	if (!findedAnswer) {
		return false
	}
	if (typeof answer === 'object' && !answer.hasOwnProperty('is_correct')) {
		return false
	}
	if (typeof answer === 'object' && answer.is_correct) {
		return true
	}
	return false
}

export function isLossAnswer(selectedAnswers: iQuizQuestionAnswer[], answer: iQuizQuestionAnswer) {
	const findedAnswer = selectedAnswers.find((selectedAnswer) => selectedAnswer.id === answer.id)
	if (!findedAnswer) {
		return false
	}
	if (!(typeof answer === 'object' && answer.hasOwnProperty('is_correct'))) {
		return false
	}
	if (!answer.is_correct) {
		return true
	}
	return false
}

export function isCorrectSkippedAnswer(selectedAnswers: iQuizQuestionAnswer[], answer: iQuizQuestionAnswer) {
	const findedAnswer = selectedAnswers.find((selectedAnswer) => selectedAnswer.id === answer.id)
	if (findedAnswer) {
		return false
	}
	if (!(typeof answer === 'object' && answer.hasOwnProperty('is_correct'))) {
		return false
	}
	if (answer.is_correct) {
		return true
	}
	return false
}

export function getQuizResultInfo(correctQuestionCounter: number, questionsLength: number) {
	let result = {
		title: "",
		description: "",
		imageUrl: ""
	}
	const resultPercent = Math.round((correctQuestionCounter) / questionsLength * 100)
	if (resultPercent <= 10) {
		result = {
			title: "Очень грустно",
			description: `Вы дали ${resultPercent}% правильных ответов. Изучите материал подробнее и вернитесь к тесту позже`,
			imageUrl: "/assets/Quizes/Results/0.svg"
		}
	} else if (resultPercent > 10 && resultPercent <= 25) {
		result = {
			title: "Грустно",
			description: `Вы дали ${resultPercent}% правильных ответов. Изучите материал подробнее и вернитесь к тесту позже`,
			imageUrl: "/assets/Quizes/Results/1.svg"
		}
	} else if (resultPercent > 25 && resultPercent <= 50) {
		result = {
			title: "Старайтесь лучше",
			description: `Вы дали ${resultPercent}% правильных ответов. Это не плохой, но и не лучший результат. Вы можете лучше`,
			imageUrl: "/assets/Quizes/Results/2.svg"
		}
	} else if (resultPercent > 50 && resultPercent <= 75) {
		result = {
			title: "Хорошо",
			description: `Вы дали ${resultPercent}% правильных ответов. Результат достаточно успешный, он показывает, что вы в целом знаете материал, но есть некоторые пробелы`,
			imageUrl: "/assets/Quizes/Results/3.svg"
		}
	} else if (resultPercent > 75) {
		result = {
			title: "Отлично",
			description: `Вы дали ${resultPercent}% правильных ответов. Это отличный результат. Он означает, что вы усвоили изученный материал`,
			imageUrl: "/assets/Quizes/Results/3.svg"
		}
	}
	return result
}