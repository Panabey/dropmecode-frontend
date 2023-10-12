import { API_URL } from '@/lib/constants';
import { iArticlePageInfo } from '@/pages/articles';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface iBlogNote{
	id: number;
	title: string;
	create_date: string;
}

interface iGetArticlesParams{
	limit: number
	page: number
}

export const articlesAPI = createApi({
	reducerPath: 'articlesAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: builder => ({
		getArticles: builder.mutation<iArticlePageInfo, iGetArticlesParams>({
			query: (data) => {
				return {
					url: `/article/all`,
					method: 'GET',
					params: data
				}
			},
		}),
	}),
})

export const { useGetArticlesMutation } = articlesAPI

