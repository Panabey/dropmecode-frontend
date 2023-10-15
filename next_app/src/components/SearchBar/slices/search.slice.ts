import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface iSearchHistoryItem {
	title: string
	link: string
	label: iInitialState['selectedFilter']
	theme: string
	imageUrl?: string
}

interface iInitialState {
	isOpened: boolean
	selectedFilter: 'langs' | 'quizes' | 'articles'
	history: iSearchHistoryItem[]
	isIncludeTags: boolean
	tags: iTag[]
}

export interface iTag {
	id: number
	title: string
	isSelected?: boolean
}

const initialState: iInitialState = {
	isOpened: false,
	selectedFilter: "langs",
	history: [],
	isIncludeTags: false,
	tags: []
}

export const searchSlice = createSlice({
	initialState: initialState,
	name: 'searchSlice',
	reducers: {
		onChangeOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpened = action.payload
			if (action.payload === false) {
				state.isIncludeTags = false;
				state.tags = []
			}
		},
		onChangeFilter: (state, action: PayloadAction<iInitialState['selectedFilter']>) => {
			state.selectedFilter = action.payload
		},
		onAddHistoryItem: (state, action: PayloadAction<iSearchHistoryItem>) => {
			state.history = state.history.filter((item) => item.link !== action.payload.link)
			if (state.history.length >= 100) {
				state.history = state.history.slice(0, 99)
			}
			state.history = [action.payload, ...state.history]
			localStorage.setItem('history', JSON.stringify(state.history));
		},
		onRemoveHistoryItem: (state, action: PayloadAction<iSearchHistoryItem>) => {
			state.history = state.history.filter((item) => item.link !== action.payload.link)
			localStorage.setItem('history', JSON.stringify(state.history));
		},
		initStore: (state) => {
			const history = JSON.parse(localStorage.getItem('history') || '[]')
			state.history = history
		},
		changeIncludeTagsStatus: (state, action: PayloadAction<boolean>) => {
			if (action.payload === true && state.selectedFilter !== 'langs') {
				state.isIncludeTags = true
			} else {
				state.isIncludeTags = false
			}
		},
		onAddTag: (state, action: PayloadAction<iTag>) => {
			const selectedTagsLength = state.tags.reduce((sum, tag) => tag.isSelected === true ? sum + 1 : sum, 0)
			if (selectedTagsLength < 4) {
				state.tags = state.tags.map((tag) => tag.id === action.payload.id ? { ...action.payload, isSelected: true } : tag)
			}
		},
		onRemoveTag: (state, action: PayloadAction<iTag>) => {
			state.tags = state.tags.map((tag) => tag.id === action.payload.id ? { ...action.payload, isSelected: false } : tag)
		},
		setTags: (state, action: PayloadAction<iTag[]>) => {
			state.tags = action.payload
		}
	}
})