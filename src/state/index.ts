import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
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
	middleware: getDefaultMiddleware({
		// TODO: This is just a temporary fix
		serializableCheck: false,
	}),
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
