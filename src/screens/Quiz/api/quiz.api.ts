import { API_URL } from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface iAPIQuizQuestion {
	id: number;
	text: string;
	hint: string;
	answers: iAnswer[];
}
export interface iAPIQuizAnswer {
	id: number;
	answers: iAnswer[];
}
interface iAnswer {
	id: number;
	text: string;
	is_correct?: boolean;
	explanation?: string;
}

interface iQuizQuestionParams {
	quiz_id: number
	question_id: number
}

interface iQuizAnswerParams {
	quiz_id: number
	question_id: number
}

interface iQuizTopicParams {
	limit: number
	count_content: number
}

interface iQuiz {
	id: number;
	logo_url: string;
	title: string;
	short_description: string;
}

interface iQuizTopics {
	id: number;
	title: string;
	quizzes: iQuiz[];
}

interface iTopicQuizesParams {
	limit: number
	topic_id: number | null
}

export const quizAPI = createApi({
	reducerPath: 'quizAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: builder => ({
		getQuestion: builder.mutation<iAPIQuizQuestion, iQuizQuestionParams>({
			query: (data) => {
				return {
					url: `/quiz/question`,
					method: 'GET',
					params: data
				}
			},
		}),
		getQuestionAnswer: builder.mutation<iAPIQuizAnswer, iQuizAnswerParams>({
			query: (data) => {
				return {
					url: `/quiz/answer/view`,
					method: 'POST',
					body: data
				}
			},
		}),
		getTopics: builder.query<iQuizTopics[], iQuizTopicParams>({
			query: (data) => {
				return {
					url: `/quiz/topic/all`,
					method: 'GET',
					params: data
				}
			},
		}),
		getQuizesFromTopic: builder.query<iQuizTopics, iTopicQuizesParams>({
			query: (data) => {
				return {
					url: `/quiz/topic`,
					method: 'GET',
					params: data
				}
			},
		}),
	}),
})

export const { useGetQuestionMutation, useGetQuestionAnswerMutation, useGetTopicsQuery, useGetQuizesFromTopicQuery } = quizAPI

