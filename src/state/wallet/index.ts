import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VaultTokens } from 'config/constants/vaultTokenAddresses'
import { SurgeTokens } from 'config/constants/surgeTokenAddresses'
import { Distributors } from 'config/constants/distributorAddresses'

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
	isConnected: boolean
	isModalOpen: boolean
	vaultBtcBalance: Balance
	vaultSBalance: Balance
	surgeBtcBalance: Balance
	surgeEthBalance: Balance
	surgeXUSDBalance: Balance
	allVaultXBalance: Balance[]
	allVaultSBalance: Balance[]
	allSurgeBalance: Balance[]
	allBalance: Balance[]
	vaultXrewardBalance: Balance
	vaultSrewardBalance: Balance
}

const initialVaultBtcBalance: Balance = {
	amount: 0,
	value: 0,
	amountString: '0',
	valueString: '0',
	token: VaultTokens.vaultBTC,
}

const initialVaultSBalance: Balance = {
	amount: 0,
	value: 0,
	amountString: '0',
	valueString: '0',
	token: VaultTokens.vaultS,
}

const initialSurgeBtcBalance: Balance = {
	amount: 0,
	value: 0,
	amountString: '0',
	valueString: '0',
	token: SurgeTokens.surgeBTC,
}

const initialSurgeEthBalance: Balance = {
	amount: 0,
	value: 0,
	amountString: '0',
	valueString: '0',
	token: SurgeTokens.surgeETH,
}

const initialSurgeXUSDBalance: Balance = {
	amount: 0,
	value: 0,
	amountString: '0',
	valueString: '0',
	token: SurgeTokens.surgeXUSD,
}

const initialVaultXRewardBalance: Balance = {
	amount: 0,
	value: 0,
	amountString: '0',
	valueString: '0',
	token: Distributors.vaultX.token,
}

const initialVaultSRewardBalance: Balance = {
	amount: 0,
	value: 0,
	amountString: '0',
	valueString: '0',
	token: Distributors.vaultS.token,
}

const initialState: WalletState = {
	isConnected: false,
	isModalOpen: false,
	vaultBtcBalance: initialVaultBtcBalance,
	vaultSBalance: initialVaultSBalance,
	surgeBtcBalance: initialSurgeBtcBalance,
	surgeEthBalance: initialSurgeEthBalance,
	surgeXUSDBalance: initialSurgeXUSDBalance,
	allVaultXBalance: [initialVaultBtcBalance, initialSurgeXUSDBalance],
	allVaultSBalance: [initialVaultSBalance, initialSurgeEthBalance],
	allSurgeBalance: [initialSurgeBtcBalance, initialSurgeEthBalance, initialSurgeXUSDBalance],
	allBalance: [initialVaultBtcBalance, initialVaultSBalance, initialSurgeBtcBalance, initialSurgeEthBalance, initialSurgeXUSDBalance],
	vaultXrewardBalance: initialVaultXRewardBalance,
	vaultSrewardBalance: initialVaultSRewardBalance,
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

		setVaultBtcBalance: (state, action: PayloadAction<Balance>) => {
			state.vaultBtcBalance.amount = action.payload.amount
			state.vaultBtcBalance.value = action.payload.value
		},
		setVaultSBalance: (state, action: PayloadAction<Balance>) => {
			state.vaultSBalance.amount = action.payload.amount
			state.vaultSBalance.value = action.payload.value
		},
		setSurgeBtcBalance: (state, action: PayloadAction<Balance>) => {
			state.surgeBtcBalance.amount = action.payload.amount
			state.surgeBtcBalance.value = action.payload.value
		},
		setSurgeEthBalance: (state, action: PayloadAction<Balance>) => {
			state.surgeEthBalance.amount = action.payload.amount
			state.surgeEthBalance.value = action.payload.value
		},
		setSurgeXUsdBalance: (state, action: PayloadAction<Balance>) => {
			state.surgeXUSDBalance.amount = action.payload.amount
			state.surgeXUSDBalance.value = action.payload.value
		},
		setAllVaultXBalance: (state, action: PayloadAction<Balance[]>) => {
			state.allVaultXBalance = action.payload
		},
		setAllVaultSBalance: (state, action: PayloadAction<Balance[]>) => {
			state.allVaultSBalance = action.payload
		},
		setAllSurgeBalance: (state, action: PayloadAction<Balance[]>) => {
			state.allSurgeBalance = action.payload
		},
		setAllBalance: (state, action: PayloadAction<Balance[]>) => {
			state.allBalance = action.payload
		},
		setVaultXRewardBalance: (state, action: PayloadAction<Balance>) => {
			state.vaultXrewardBalance = action.payload
		},
		setVaultSRewardBalance: (state, action: PayloadAction<Balance>) => {
			state.vaultSrewardBalance = action.payload
		},
	},
})

export const {
	setIsConnected,
	setVaultBtcBalance,
	setVaultSBalance,
	setAllVaultXBalance,
	setAllVaultSBalance,
	ToggleWalletModal,
	setSurgeBtcBalance,
	setSurgeEthBalance,
	setSurgeXUsdBalance,
	setAllSurgeBalance,
	setAllBalance,
	setVaultXRewardBalance,
	setVaultSRewardBalance,
} = walletSlice.actions

export default walletSlice.reducer
