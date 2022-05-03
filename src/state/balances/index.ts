import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnimalFarmTokens } from 'config/constants'

export interface Token {
	address: string
	name: string
	symbol: string
	decimals: number
}

export interface Balance {
	amount: number
	value: number
	amountString: string
	valueString: string
	token: Token
}

interface WalletState {
	pigsBalance: Balance
	// dogsBalance: Balance
	busdBalance: string
	pigsBusdLpBalance: string
	allBalance: Balance[]
}

const initialPigsBalance: Balance = {
	amount: 0,
	value: 0,
	amountString: '0',
	valueString: '0',
	token: AnimalFarmTokens.pigsToken,
}

// const initialDogsBalance: Balance = {
// 	amount: 0,
// 	value: 0,
// 	amountString: '0',
// 	valueString: '0',
// 	token: AnimalFarmTokens.dogsToken,
// }

const initialState = {
	pigsBalance: initialPigsBalance,
	// pigsBalance: '',
	busdBalance: '0',
	pigsBusdLpBalance: '0',
	allBalance: [initialPigsBalance],
}

const balanceSlice = createSlice({
	name: 'balance',
	initialState,
	reducers: {
		setPigsBalance: (state, action: PayloadAction<Balance>) => {
			state.pigsBalance = action.payload
		},
		setBusdBalance: (state, action: PayloadAction<string>) => {
			state.busdBalance = action.payload
		},
		setPigsBusdLpBalance: (state, action: PayloadAction<string>) => {
			state.busdBalance = action.payload
		},
		setAllBalance: (state, action: PayloadAction<Balance[]>) => {
			state.allBalance = action.payload
		},
	},
})

export const { setPigsBalance, setBusdBalance, setPigsBusdLpBalance, setAllBalance } = balanceSlice.actions
export default balanceSlice.reducer
