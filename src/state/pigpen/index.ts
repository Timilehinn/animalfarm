import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PigPen {
	lastRewardBlock?: string
	pigsSupply?: string
	harvestPercent?: string
	maxLockUpDuration?: string
	busdRewards?: string
	pigsRewards?: string
}

export interface PigPenUserData {
	allowance?: string
	tokenBalance?: string
	stakedBalance?: string
	startLockTimestamp?: string
	canHarvest?: boolean
	pigAvailableForWithdrawal?: string
	earningsBusd?: string
	earningsPigs?: string
}

export interface PigPenState {
	pigPendata: PigPen
	userData: PigPenUserData
	userDataLoaded: boolean
}

const initialState: PigPenState = {
	pigPendata: {
		lastRewardBlock: '0',
		pigsSupply: '0',
		harvestPercent: '0',
		maxLockUpDuration: '0',
		busdRewards: '0',
		pigsRewards: '0',
	},

	userData: {
		allowance: '0',
		tokenBalance: '0',
		stakedBalance: '0',
		startLockTimestamp: '',
		canHarvest: false,

		earningsBusd: '0',
		earningsPigs: '0',
	},
	userDataLoaded: false,
}

export const pigPenSlice = createSlice({
	name: 'pigpen',
	initialState,
	reducers: {
		setPigPenData: (state, action: PayloadAction<PigPen>) => {
			state.pigPendata = action.payload
		},
		setUserData: (state, action: PayloadAction<PigPenUserData>) => {
			state.userData = action.payload
			state.userDataLoaded = true
		},
	},
})

// Actions
export const { setPigPenData, setUserData } = pigPenSlice.actions

export default pigPenSlice.reducer
