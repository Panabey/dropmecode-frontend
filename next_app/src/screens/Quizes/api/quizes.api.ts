import { API_URL } from '@/lib/constants';
import { iQuizesPageInfo } from '@/pages/quizes';
import { iAllQuizesPageInfo } from '@/pages/quizes/all';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface iBlogNote {
	id: number;
	title: string;
	create_date: string;
}

interface iGetQuizTopicsParams {
	limit: number
	count_content: number
	continue_after: number
}
interface iGetAllQuizesParams {
	topic_id?: number
	limit: number
	continue_after: number
}

export const quizesAPI = createApi({
	reducerPath: 'quizesAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: builder => ({
		getTopics: builder.mutation<iQuizesPageInfo[], iGetQuizTopicsParams>({
			query: (data) => {
				return {
					url: `/quiz/topic/all`,
					method: 'GET',
					params: data
				}
			},
		}),
		getAllQuizes: builder.mutation<iAllQuizesPageInfo, iGetAllQuizesParams>({
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

export const { useGetTopicsMutation, useGetAllQuizesMutation } = quizesAPI

