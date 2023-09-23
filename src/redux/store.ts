import { searchAPI } from '@/components/SearchBar/api/search.api'
import { searchSlice } from '@/components/SearchBar/slices/search.slice'
import { articlesAPI } from '@/screens/ArticlesList/api/articles.api'
import { blogsAPI } from '@/screens/Blogs/api/blogs.api'
import { homeAPI } from '@/screens/Home/api/home.api'
import { langDocsThemeAPI } from '@/screens/LangDocsTheme/api/langDocsTheme.api'
import { quizAPI } from '@/screens/Quiz/api/quiz.api'
import { quizesAPI } from '@/screens/Quizes/api/quizes.api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const rootReducer = combineReducers({
	[quizAPI.reducerPath]: quizAPI.reducer,
	[langDocsThemeAPI.reducerPath]: langDocsThemeAPI.reducer,
	[searchAPI.reducerPath]: searchAPI.reducer,
	[homeAPI.reducerPath]: homeAPI.reducer,
	[blogsAPI.reducerPath]: blogsAPI.reducer,
	[articlesAPI.reducerPath]: articlesAPI.reducer,
	[quizesAPI.reducerPath]: quizesAPI.reducer,
	[searchSlice.name]: searchSlice.reducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(
				quizAPI.middleware,
				langDocsThemeAPI.middleware,
				searchAPI.middleware,
				homeAPI.middleware,
				blogsAPI.middleware,
				articlesAPI.middleware,
				quizesAPI.middleware
			),
	})
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
