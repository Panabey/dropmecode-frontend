import { API_URL } from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface iLangDocsThemes {
	id: number;
	title: string;
	description: string;
	content: iContent[];
}

interface iContent {
	title: string;
	description: string;
	page: iPage[];
	part: number;
}

interface iPage {
	id: number;
	title: string;
	subpart: string;
}

interface iGetHandbookThemesParams {
	handbook: string
}

export const langDocsThemeAPI = createApi({
	reducerPath: 'langDocsThemeAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: builder => ({
		getHandbookThemes: builder.query<iLangDocsThemes, iGetHandbookThemesParams>({
			query: (data) => {
				return {
					url: `/handbook/content`,
					method: 'GET',
					params: data
				}
			},
		}),
	}),
})

export const { useGetHandbookThemesQuery } = langDocsThemeAPI

