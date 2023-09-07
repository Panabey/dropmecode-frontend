// import { API_URL } from '@/lib/constants';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const langDocsThemeAPI = createApi({
// 	reducerPath: 'quizAPI',
// 	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
// 	endpoints: builder => ({
// 		getQuestion: builder.mutation<iAPIQuizQuestion, iQuizQuestionParams>({
// 			query: (data) => {
// 				return {
// 					url: `/quiz/question`,
// 					method: 'GET',
// 					params: data
// 				}
// 			},
// 		}),
// 		getQuestionAnswer: builder.mutation<iAPIQuizAnswer, iQuizAnswerParams>({
// 			query: (data) => {
// 				return {
// 					url: `/quiz/answer/view`,
// 					method: 'POST',
// 					body: data
// 				}
// 			},
// 		}),
// 	}),
// })

// export const { useGetQuestionMutation, useGetQuestionAnswerMutation } = quizAPI

