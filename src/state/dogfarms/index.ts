import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dogFarms from 'config/constants/dogFarms'
import isArchivedPid from 'utils/farmHelpers'
import priceHelperLpsConfig from 'config/constants/priceHelperLps'
import fetchFarms from './fetchFarms'
import fetchFarmsPrices from './fetchFarmsPrices'
import { fetchFarmUserAllowances, fetchFarmUserTokenBalances, fetchFarmUserStakedBalances, fetchFarmUserCanHarvest, fetchFarmUserEarnings, fetchFarmUserBusdEarnings } from './fetchFarmUser'
import { DogFarmsState, Farm, FarmEmissions, FarmsState } from '../types'
import fetchFarmEmissions from './fetchFarmEmissions'

const noAccountFarmConfig = dogFarms.map((farm) => ({
	...farm,
	userData: {
		allowance: '0',
		tokenBalance: '0',
		stakedBalance: '0',
		earningsDogs: '0',
		earningsLockedDogs: '0',
		earningsBusd: '0',
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

export const nonArchivedFarms = dogFarms.filter(({ pid }) => !isArchivedPid(pid))

// Async thunks
export const fetchDogFarmsPublicDataAsync = createAsyncThunk<Farm[], number[]>('dogfarms/fetchDogFarmsPublicDataAsync', async (pids) => {
	const farmsToFetch = dogFarms.filter((farmConfig) => pids.includes(farmConfig.pid))

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
	timeTillUnlock: string

	earningsDogs: string
	earningsLockedDogs: string
	earningsBusd: string
}

export const fetchDogFarmEmissionsAsync = createAsyncThunk('dogfarms/fetchDogFarmEmissionsAsync', async () => {
	const emissions = await fetchFarmEmissions()
	return emissions
})

export const fetchDogFarmUserDataAsync = createAsyncThunk<FarmUserDataResponse[], { account: string; pids: number[] }>('dogfarms/fetchDogFarmUserDataAsync', async ({ account, pids }) => {
	// const farmsToFetch = dogFarms.filter((farmConfig) => pids.includes(farmConfig.pid)).slice(0, 3)
	const farmsToFetch = dogFarms.filter((farmConfig) => pids.includes(farmConfig.pid))
	const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch)
	const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch)
	const [userStakedBalances, lockedUpDogs, nextHarvest] = await fetchFarmUserStakedBalances(account, farmsToFetch)
	const userFarmDogsEarnings = await fetchFarmUserEarnings(account, farmsToFetch)
	const userFarmBusdEarnings = await fetchFarmUserBusdEarnings(account, farmsToFetch)
	const userFarmCanHarvest = await fetchFarmUserCanHarvest(account, farmsToFetch)

	return userFarmAllowances.map((farmAllowance, index) => {
		return {
			pid: farmsToFetch[index].pid,
			allowance: userFarmAllowances[index],
			tokenBalance: userFarmTokenBalances[index],

			stakedBalance: userStakedBalances[index],
			earningsLockedDogs: lockedUpDogs[index],
			timeTillUnlock: nextHarvest[index],

			earningsDogs: userFarmDogsEarnings[index],
			earningsBusd: userFarmBusdEarnings[index],
			canHarvest: userFarmCanHarvest[index],
		}
	})
})

export const dogfarmsSlice = createSlice({
	name: 'dogfarms',
	initialState,
	reducers: {
		setLoadArchivedFarmsData: (state, action) => {
			const loadArchivedFarmsData = action.payload
			state.loadArchivedFarmsData = loadArchivedFarmsData
		},
	},
	extraReducers: (builder) => {
		// Update farms with live data
		builder.addCase(fetchDogFarmsPublicDataAsync.fulfilled, (state, action) => {
			state.data = state.data.map((farm) => {
				const liveFarmData = action.payload.find((farmData) => farmData.pid === farm.pid)
				return { ...farm, ...liveFarmData }
			})
		})

		// Update farms with user data
		builder.addCase(fetchDogFarmUserDataAsync.fulfilled, (state, action) => {
			action.payload.forEach((userDataEl) => {
				const { pid } = userDataEl
				const index = state.data.findIndex((farm) => farm.pid === pid)
				state.data[index] = { ...state.data[index], userData: userDataEl }
			})
			state.userDataLoaded = true
		})

		builder.addCase(fetchDogFarmEmissionsAsync.fulfilled, (state, action) => {
			const newState = {
				...state.emissions,
				tokenPerBlock: action.payload.tokenPerBlock,
				maxEmissionRate: action.payload.maxEmissionRate,
				ActiveEmissionIndex: action.payload.ActiveEmissionIndex,
				vaultBusdBalance: action.payload.vaultBusdBalance,
			}
			state.emissions = newState
			// return newState

			// return {
			//     ...state,
			//     emissions : {
			//         tokenPerBlock: action.payload.tokenPerBlock,
			//         maxEmissionRate: action.payload.maxEmissionRate,
			//         ActiveEmissionIndex: action.payload.ActiveEmissionIndex,
			//         vaultBusdBalance: action.payload.vaultBusdBalance,
			//     }
			// }

			// const x = {
			//     tokenPerBlock : action.payload.tokenPerBlock
			//     // state.emissions.maxEmissionRate = action.payload.maxEmissionRate
			//     // state.emissions.ActiveEmissionIndex = action.payload.ActiveEmissionIndex
			//     // state.emissions.topPriceInCents = action.payload.topPriceInCents
			//     // state.emissions.bottomPriceInCents = action.payload.bottomPriceInCents
			//     // state.emissions.vaultBusdBalance = action.payload.vaultBusdBalance
			// }
			//
			// // Object.assign ( state.emissions, ...x)
			// Object.assign(state.emissions, Object.assign(x));
			//
			// state.userDataLoaded = true
		})
	},
})

// Actions
export const { setLoadArchivedFarmsData } = dogfarmsSlice.actions

export default dogfarmsSlice.reducer
