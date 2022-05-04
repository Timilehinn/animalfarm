import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './wallet'
import toggleReducer from './toggle'
import balanceReducer from './balances'
import pigsCreditReducer from './pigs'
import piggyBankReducer from './piggybank'

const store = configureStore({
	reducer: {
		walletReducer,
		toggleReducer,
		balanceReducer,
		pigsCreditReducer,
		piggyBankReducer,
	},
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
