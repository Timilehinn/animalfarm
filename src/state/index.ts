import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './wallet'
import toggleReducer from './toggle'
import balanceReducer from './balances'
import pigsCreditReducer from './pigs'
import piggyBankReducer from './piggybank'
import pigPenReducer from './pigpen'

const store = configureStore({
	reducer: {
		walletReducer,
		toggleReducer,
		balanceReducer,
		pigsCreditReducer,
		piggyBankReducer,
		pigPenReducer,
	},
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
