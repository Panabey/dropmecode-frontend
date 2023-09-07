import { searchSlice } from '@/components/SearchBar/slices/search.slice'
import { langDocsThemeAPI } from '@/screens/LangDocsTheme/api/langDocsTheme.api'
import { quizAPI } from '@/screens/Quiz/api/quiz.api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const rootReducer = combineReducers({
	[quizAPI.reducerPath]: quizAPI.reducer,
	[langDocsThemeAPI.reducerPath]: langDocsThemeAPI.reducer,
	[searchSlice.name]: searchSlice.reducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(
				quizAPI.middleware,
				langDocsThemeAPI.middleware
			),
	})
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector