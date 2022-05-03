import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WalletState {
	isConnected: boolean
	isModalOpen: boolean
}

const initialState: WalletState = {
	isConnected: false,
	isModalOpen: false,
}

const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		setIsConnected: (state, action: PayloadAction<boolean>) => {
			state.isConnected = action.payload
		},
		ToggleWalletModal: (state, action: PayloadAction<boolean>) => {
			state.isModalOpen = action.payload
		},
	},
})

export const { setIsConnected, ToggleWalletModal } = walletSlice.actions

export default walletSlice.reducer
