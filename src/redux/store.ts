import { quizAPI } from '@/screens/Quiz/api/quiz.api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const rootReducer = combineReducers({
	[quizAPI.reducerPath]: quizAPI.reducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(
				quizAPI.middleware
			),
	})
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
