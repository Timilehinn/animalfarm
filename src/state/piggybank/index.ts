import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserPiggyBank = {
	ID: string
	isStakeOn: boolean
	hatcheryPiglets: string
	availableTruffles: string
	claimedTruffles: string
	lastFeeding: string
	lastCompounded: string
	trufflesUsed: string
	trufflesSold: string
	timeLeftSinceLock: string
	usdValue: string
	isMaxPayOut: boolean
	PiggyLocker
	PiggyLockBonus
	paddedPrecisionValue: string
}

export type PiggyLocker = {
	duration: string
	durationTimestamp: string
	startLockTimestamp: string
}

export type PiggyLockBonus = {
	isExpired: boolean
	bonus: string
	distributedBonus: string
	dayLastDistributed: string
}

export type PiggyBankRef = {
	amount: string
	lockDuration: string
	referral: string
	timestamp: string
}

export type PiggyBank = {
	marketTruffles: string
	calculatedTruffles?: string
	balance?: string
	userData?: {
		userPiggyBanks: UserPiggyBank[]
		referrals: PiggyBankRef[]
		usdValue: string
	}
}

export interface PiggyBankState {
	isInitialized: boolean
	isLoading: boolean
	data: PiggyBank
}

const initialState: PiggyBankState = {
	isInitialized: false,
	isLoading: true,
	data: {
		marketTruffles: '0',
		balance: '0',
		userData: {
			userPiggyBanks: [
				{
					ID: '0',
					isStakeOn: false,
					hatcheryPiglets: '0',
					availableTruffles: '0',
					claimedTruffles: '0',
					lastFeeding: '0',
					lastCompounded: '0',
					trufflesUsed: '0',
					trufflesSold: '0',
					usdValue: '0',
					timeLeftSinceLock: '0',
					isMaxPayOut: false,
					paddedPrecisionValue: '0',

					PiggyLocker: {
						duration: '0',
						durationTimestamp: '0',
						startLockTimestamp: '0',
					},

					PiggyLockBonus: {
						isExpired: false,
						bonus: '0',
						distributedBonus: '0',
						dayLastDistributed: '0',
					},
				},
			],
			referrals: [],
			usdValue: '0',
		},
	},
}

const piggyBankSlice = createSlice({
	name: 'piggybank',
	initialState,
	reducers: {
		fetchStart: (state) => {
			state.isLoading = true
		},
		fetchFailed: (state) => {
			state.isLoading = false
			state.isInitialized = true
		},
		piggybankFetchSucceeded: (state, action: PayloadAction<PiggyBank>) => {
			state.isInitialized = true
			state.isLoading = false
			state.data = action.payload
		},
	},
})

export const { fetchStart, fetchFailed, piggybankFetchSucceeded } = piggyBankSlice.actions

export default piggyBankSlice.reducer
