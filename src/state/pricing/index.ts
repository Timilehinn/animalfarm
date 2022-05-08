import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	data: {
		busdAllowance: '0',
		busdBalance: '0',
		pigsBalance: '0',
		pigsAvailableToClaim: '0',
	},
	pigsBusdPrice: '0.00',
}

const pricingSlice = createSlice({
	name: 'pricing',
	initialState,
	reducers: {
		setPigsCreditData: (state, action) => {
			state.data = { ...state, ...action.payload }
		},
		setPigsBusdPrice: (state, action: PayloadAction<string>) => {
			state.pigsBusdPrice = action.payload
		},
	},
})

export const { setPigsCreditData, setPigsBusdPrice } = pricingSlice.actions
export default pricingSlice.reducer
