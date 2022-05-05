import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	data: {
		busdAllowance: '0',
		busdBalance: '0',
		pigsBalance: '0',
		pigsAvailableToClaim: '0',
		pigsBusdPrice: '0',
	},
}

const pigsCreditSlice = createSlice({
	name: 'pigsCredit',
	initialState,
	reducers: {
		setPigsCreditData: (state, action) => {
			state.data = { ...state, ...action.payload }
		},
		setPigsBusdPrice: (state, action: PayloadAction<string>) => {
			state.data.pigsBusdPrice = action.payload
		},
	},
})

export const { setPigsCreditData, setPigsBusdPrice } = pigsCreditSlice.actions
export default pigsCreditSlice.reducer
