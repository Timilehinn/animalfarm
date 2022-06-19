import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GardenState, Garden } from '../types'
import { calculateMiners, getGarden } from './helpers'

const initialState: GardenState = {
	isInitialized: false,
	isLoading: true,
	data: {
		marketSeeds: '0',
		seedsToHatch: '0',
		balance: '0',
		timeMultiplier: '0',
		balanceMultiplier: '0',
		userData: {
			lpBalance: '',
			lpAllowance: '0',
			plants: '0',
			seeds: '0',
			availableSeeds: '0',
			secondsUntilFull: '0',
			claimed: '0',
			last: '0',
			referrals: '0',
			usdValue: '0',
		},
	},
}

export const fetchGardenDataAsync = createAsyncThunk<Garden, { account: string }>('garden/fetchGardenDataAsync', async ({ account }) => {
	let gardenData

	try {
		gardenData = await getGarden(account)
	} catch (e) {
		console.error('err e', e)
	}

	return gardenData
})

export const gardenSlice = createSlice({
	name: 'garden',
	initialState,
	reducers: {
		fetchStart: (state) => {
			state.isLoading = true
		},
		fetchFailed: (state) => {
			state.isLoading = false
			state.isInitialized = true
		},
		gardenFetchSucceeded: (state, action: PayloadAction<Garden>) => {
			state.isInitialized = true
			state.isLoading = false
			state.data = action.payload
		},
	},
	extraReducers: (builder) => {
		// Update farms with live data
		builder.addCase(fetchGardenDataAsync.fulfilled, (state, action) => {
			state.data = action.payload
		})
	},
})

// Actions
export const { fetchStart, gardenFetchSucceeded, fetchFailed } = gardenSlice.actions

// Thunks
// export const fetchTeam = (teamId: number) => async (dispatch) => {
//   try {
//     dispatch(fetchStart())
//     const team = await getTeam(teamId)
//     dispatch(teamFetchSucceeded(team))
//   } catch (error) {
//     dispatch(fetchFailed())
//   }
// }

export const fetchCalcMiner = (amount: string) => async (dispatch) => {
	const minerAmount = await calculateMiners(amount)
	console.log('minerAmount:', minerAmount)
	return minerAmount
}

export const fetchGarden = (account: string) => async (dispatch) => {
	try {
		dispatch(fetchStart())
		const miner = await getGarden(account)
		dispatch(gardenFetchSucceeded(miner))
	} catch (error) {
		dispatch(fetchFailed())
	}
}

export default gardenSlice.reducer
