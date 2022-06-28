import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import pigFarms from 'config/constants/pigFarms'
import isArchivedPid from 'utils/farmHelpers'
import priceHelperLpsConfig from 'config/constants/priceHelperLps'
import fetchFarms from './fetchFarms'
import fetchFarmsPrices from './fetchFarmsPrices'
import { fetchFarmUserAllowances, fetchFarmUserTokenBalances, fetchFarmUserStakedBalances, fetchFarmUserCanHarvest, fetchFarmUserEarnings } from './fetchFarmUser'
import { Farm, FarmsState } from '../types'
import fetchFarmEmissions from './fetchFarmEmissions'

const noAccountFarmConfig = pigFarms.map((farm) => ({
	...farm,
	userData: {
		allowance: '0',
		tokenBalance: '0',
		stakedBalance: '0',
		earningsPigs: '0',
		earningsLockedPigs: '0',
		timeTillUnlock: '0',
		canHarvest: '0',
	},
}))

const initialState: FarmsState = {
	data: noAccountFarmConfig,
	emissions: {
		tokenPerBlock: 'N/A',
		maxEmissionRate: 'N/A',
		ActiveEmissionIndex: 'N/A',
		topPriceInCents: 'N/A',
		bottomPriceInCents: 'N/A',
	},
	loadArchivedFarmsData: false,
	userDataLoaded: false,
}

export const nonArchivedFarms = pigFarms.filter(({ pid }) => !isArchivedPid(pid))

// Async thunks
export const fetchPigFarmsPublicDataAsync = createAsyncThunk<Farm[], number[]>('pigfarms/fetchFarmsPublicDataAsync', async (pids) => {
	const farmsToFetch = pigFarms.filter((farmConfig) => pids.includes(farmConfig.pid))

	// Add price helper farms
	const farmsWithPriceHelpers = farmsToFetch.concat(priceHelperLpsConfig)

	const farms = await fetchFarms(farmsWithPriceHelpers)
	const farmsWithPrices = await fetchFarmsPrices(farms)

	// Filter out price helper LP config farms
	const farmsWithoutHelperLps = farmsWithPrices.filter((farm: Farm) => {
		return farm.pid || farm.pid === 0
	})

	return farmsWithoutHelperLps
})

interface FarmUserDataResponse {
	pid: number
	allowance: string
	tokenBalance: string
	stakedBalance: string
	earningsPigs: string
	earningsLockedPigs: string
	timeTillUnlock: string
}

export const fetchPigFarmEmissionsAsync = createAsyncThunk('dogfarms/fetchPigFarmEmissionsAsync', async () => {
	const emissions = await fetchFarmEmissions()
	return emissions
})

export const fetchPigFarmUserDataAsync = createAsyncThunk<FarmUserDataResponse[], { account: string; pids: number[] }>('pigfarms/fetchFarmUserDataAsync', async ({ account, pids }) => {
	const farmsToFetch = pigFarms.filter((farmConfig) => pids.includes(farmConfig.pid))
	const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch)
	const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch)
	const [userStakedBalances, lockedUpPigs, nextHarvest] = await fetchFarmUserStakedBalances(account, farmsToFetch)
	const userFarmPigsEarnings = await fetchFarmUserEarnings(account, farmsToFetch)
	const userFarmCanHarvest = await fetchFarmUserCanHarvest(account, farmsToFetch)

	return userFarmAllowances.map((farmAllowance, index) => {
		return {
			pid: farmsToFetch[index].pid,
			allowance: userFarmAllowances[index],
			tokenBalance: userFarmTokenBalances[index],

			stakedBalance: userStakedBalances[index],
			earningsLockedPigs: lockedUpPigs[index],
			timeTillUnlock: nextHarvest[index],

			earningsPigs: userFarmPigsEarnings[index],
			canHarvest: userFarmCanHarvest[index],
		}
	})
})

export const pigfarmsSlice = createSlice({
	name: 'pigfarms',
	initialState,
	reducers: {
		setLoadArchivedFarmsData: (state, action) => {
			const loadArchivedFarmsData = action.payload
			state.loadArchivedFarmsData = loadArchivedFarmsData
		},
	},
	extraReducers: (builder) => {
		// Update farms with live data
		builder.addCase(fetchPigFarmsPublicDataAsync.fulfilled, (state, action) => {
			state.data = state.data.map((farm) => {
				const liveFarmData = action.payload.find((farmData) => farmData.pid === farm.pid)
				return { ...farm, ...liveFarmData }
			})
		})

		// Update farms with user data
		builder.addCase(fetchPigFarmUserDataAsync.fulfilled, (state, action) => {
			action.payload.forEach((userDataEl) => {
				const { pid } = userDataEl
				const index = state.data.findIndex((farm) => farm.pid === pid)
				state.data[index] = { ...state.data[index], userData: userDataEl }
			})
			state.userDataLoaded = true
		})

		builder.addCase(fetchPigFarmEmissionsAsync.fulfilled, (state, action) => {
			state.emissions = action.payload
			state.userDataLoaded = true
		})
	},
})

// Actions
export const { setLoadArchivedFarmsData } = pigfarmsSlice.actions

export default pigfarmsSlice.reducer
