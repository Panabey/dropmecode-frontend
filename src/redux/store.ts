import { searchAPI } from '@/components/SearchBar/api/search.api'
import { searchSlice } from '@/components/SearchBar/slices/search.slice'
import { homeAPI } from '@/screens/Home/api/home.api'
import { langDocsThemeAPI } from '@/screens/LangDocsTheme/api/langDocsTheme.api'
import { quizAPI } from '@/screens/Quiz/api/quiz.api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const rootReducer = combineReducers({
	[quizAPI.reducerPath]: quizAPI.reducer,
	[langDocsThemeAPI.reducerPath]: langDocsThemeAPI.reducer,
	[searchAPI.reducerPath]: searchAPI.reducer,
	[homeAPI.reducerPath]: homeAPI.reducer,
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
				homeAPI.middleware
			),
	})
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
