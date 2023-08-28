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
	}),
})

export const { useGetQuestionMutation, useGetQuestionAnswerMutation } = quizAPI

