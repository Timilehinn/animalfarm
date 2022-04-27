import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './wallet'
import toggleReducer from './toggle'

const store = configureStore({
	reducer: {
		walletReducer,
		toggleReducer
	},
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
