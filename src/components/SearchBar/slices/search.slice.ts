import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface iSearchHistoryItem {
	title: string
	link: string
	label: iInitialState['selectedFilter']
	theme: string
}

interface iInitialState {
	isOpened: boolean
	selectedFilter: 'langs' | 'quizes' | 'articles'
	history: iSearchHistoryItem[]
}

const initialState: iInitialState = {
	isOpened: false,
	selectedFilter: "langs",
	history: []
}

export const searchSlice = createSlice({
	initialState: initialState,
	name: 'searchSlice',
	reducers: {
		onChangeOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpened = action.payload
		},
		onChangeFilter: (state, action: PayloadAction<iInitialState['selectedFilter']>) => {
			state.selectedFilter = action.payload
		},
		onAddHistoryItem: (state, action: PayloadAction<iSearchHistoryItem>) => {
			state.history.push(action.payload)
			localStorage.setItem('history', JSON.stringify(state.history));
		},
		onRemoveHistoryItem: (state, action: PayloadAction<iSearchHistoryItem>) => {
			state.history = state.history.filter((item) => item.link !== action.payload.link)
			localStorage.setItem('history', JSON.stringify(state.history));
		},
		initStore: (state) => {
			const history = JSON.parse(localStorage.getItem('history') || '[]')
			state.history = history
		}
	}
})