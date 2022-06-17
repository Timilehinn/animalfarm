import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import walletReducer from './wallet'
import toggleReducer from './toggle'
import balanceReducer from './balances'
import pricingReducer from './pricing'
import piggyBankReducer from './piggybank'
import pigPenReducer from './pigpen'
import dripGardenReducer from './garden'

const store = configureStore({
	reducer: {
		walletReducer,
		toggleReducer,
		balanceReducer,
		pricingReducer,
		piggyBankReducer,
		pigPenReducer,
		dripGardenReducer,
	},
	middleware: getDefaultMiddleware({
		// TODO: This is just a temporary fix
		serializableCheck: false,
	}),
})

export * from './types'
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
