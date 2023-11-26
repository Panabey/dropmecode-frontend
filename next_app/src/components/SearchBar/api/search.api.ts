import { API_URL } from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { iTag } from '../slices/search.slice';

interface iSearchHandbookParams {
	q: string
	limit: number
}

export interface iSearchHandbookThemes {
	id: number;
	title: string;
	slug: string;
	page_id: number;
	page_title: string;
}

interface iSearchArticlesParams {
	q: string | undefined
	limit: number
	tags: number[]
}

export interface iSearchArticles {
	id: number;
	logo_url: string;
	title: string;
	anons: string;
	tags: string[];
	reading_time: number;
	create_date: string;
}

interface iSearchQuizesParams {
	q: string | undefined
	limit: number
	tags: number[]
}

interface iSearchTagsParams {
	status: 'article' | 'quiz'
	limit: number
}

export interface iSearchQuizes {
	id: number;
	logo_url: string;
	title: string;
	short_description: string;
	tags: any[];
}

export const searchAPI = createApi({
	reducerPath: 'searchAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: builder => ({
		getHandbookThemes: builder.mutation<iSearchHandbookThemes[], iSearchHandbookParams>({
			query: (data) => {
				return {
					url: `/handbook/search`,
					method: 'POST',
					body: data
				}
			},
		}),
		getArticles: builder.mutation<iSearchArticles[], iSearchArticlesParams>({
			query: (data) => {
				return {
					url: `/article/search`,
					method: 'POST',
					body: data
				}
			},
		}),
		getQuizes: builder.mutation<iSearchQuizes[], iSearchQuizesParams>({
			query: (data) => {
				return {
					url: `/quiz/search`,
					method: 'POST',
					body: data
				}
			},
		}),
		getTags: builder.mutation<iTag[], iSearchTagsParams>({
			query: (data) => {
				return {
					url: `/tags`,
					method: 'GET',
					params: data
				}
			},
		}),
	}),
})

export const { useGetHandbookThemesMutation, useGetArticlesMutation, useGetQuizesMutation, useGetTagsMutation } = searchAPI

