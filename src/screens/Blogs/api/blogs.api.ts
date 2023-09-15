import { API_URL } from '@/lib/constants';
import { iBlogsPageInfo } from '@/pages/blog';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface iBlogNote {
	id: number;
	title: string;
	create_date: string;
}

interface iGetBlogsPreviewsParams {
	page: number
	limit: number
}

export const blogsAPI = createApi({
	reducerPath: 'blogsAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: builder => ({
		getBlogsPreviews: builder.mutation<iBlogsPageInfo, iGetBlogsPreviewsParams>({
			query: (data) => {
				return {
					url: `/project/news/all`,
					method: 'GET',
					params: data
				}
			},
		}),
	}),
})

export const { useGetBlogsPreviewsMutation } = blogsAPI

