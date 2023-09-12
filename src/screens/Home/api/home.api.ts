import { API_URL } from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface iBlogNote{
	id: number;
	title: string;
	create_date: string;
}

interface iGetBlogNotesParams{
	limit: number
}

export const homeAPI = createApi({
	reducerPath: 'homeAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: builder => ({
		getBlogNotes: builder.query<iBlogNote[], iGetBlogNotesParams>({
			query: (data) => {
				return {
					url: `/project/news/widget`,
					method: 'GET',
					params: data
				}
			},
		}),
	}),
})

export const { useGetBlogNotesQuery } = homeAPI

