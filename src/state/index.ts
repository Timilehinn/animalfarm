import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './wallet'
import toggleReducer from './toggle'
import balanceReducer from './balances'
import pigsCreditReducer from './pigsCredit'

const store = configureStore({
	reducer: {
		walletReducer,
		toggleReducer,
		balanceReducer,
		pigsCreditReducer

	},
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
