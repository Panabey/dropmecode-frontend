import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface iInitialState {
	isOpened: boolean
	imageSrc: string
	alt: string
}


const initialState: iInitialState = {
	isOpened: false,
	imageSrc: '',
	alt: ''
}

interface iSetImageAction {
	imageSrc: string
	alt: string
}

export const imageViewerSlice = createSlice({
	initialState: initialState,
	name: 'imageViewerSlice',
	reducers: {
		onChangeOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpened = action.payload
		},
		setValues: (state, action: PayloadAction<iSetImageAction>) => {
			state.imageSrc = action.payload.imageSrc
			state.alt = action.payload.alt
		},
	}
})