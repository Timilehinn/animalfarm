/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { farmsConfig } from 'config/constants'
import { fetchDogFarmsPublicDataAsync } from 'state/dogfarms'
import { fetchPigFarmsPublicDataAsync, fetchPigFarmUserDataAsync, fetchPigFarmEmissionsAsync, nonArchivedFarms } from '.'
import { Farm, PigFarmsState, FarmEmissions } from '../types'

export const usePollPigFarmsData = (includeArchive = false) => {
	const dispatch = useAppDispatch()
	const { account } = useWeb3React()

	useEffect(() => {
		const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
		const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

		dispatch(fetchPigFarmsPublicDataAsync(pids))
		dispatch(fetchPigFarmEmissionsAsync())

		if (account) {
			dispatch(fetchPigFarmUserDataAsync({ account, pids }))
		}
	}, [includeArchive, account])
}

/**
 * Fetches the "core" farm data used globally
 * 251 = CAKE-BNB LP
 * 252 = BUSD-BNB LP
 */
export const usePollPigCoreFarmData = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		console.log('Use Effect PIGS is running....')
		dispatch(fetchPigFarmsPublicDataAsync([0]))
		dispatch(fetchDogFarmsPublicDataAsync([0]))
	}, [])
}

export const usePigFarms = (): PigFarmsState => {
	const farms = useAppSelector((state) => state.pigFarmsReducer)
	return farms
}

export const usePigFarmFromPid = (pid): Farm => {
	const farm = useAppSelector((state) => state.pigFarmsReducer.data.find((f) => f.pid === pid))
	return farm
}

export const usePigFarmEmissions = (): FarmEmissions => {
	const emissions = useAppSelector((state) => state.pigFarmsReducer.emissions)
	return emissions
}

export const usePigFarmFromLpSymbol = (lpSymbol: string): Farm => {
	const farm = useAppSelector((state) => state.pigFarmsReducer.data.find((f) => f.lpSymbol === lpSymbol))
	return farm
}

export const useFarmFromLpSymbol = (lpSymbol: string, isPigFarm: boolean): Farm => {
	const xxx = isPigFarm ? 'pigfarms' : 'dogfarms'
	const farm = useAppSelector((state) => state[xxx].data.find((f) => f.lpSymbol === lpSymbol))

	return farm
}

export const usePigsFarmUser = (pid) => {
	const farm = usePigFarmFromPid(pid)

	return {
		allowance: farm?.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
		tokenBalance: farm?.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
		stakedBalance: farm?.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
		earningsPigs: farm?.userData ? new BigNumber(farm.userData.earningsPigs) : BIG_ZERO,
	}
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPidPigs = (pid: number): BigNumber => {
	const farm = usePigFarmFromPid(pid)
	return farm && new BigNumber(farm.token.busdPrice)
}

export const useLpTokenPricePigs = (symbol: string) => {
	const farm = usePigFarmFromLpSymbol(symbol)
	const farmTokenPriceInUsd = useBusdPriceFromPidPigs(farm.pid)
	let lpTokenPrice = BIG_ZERO

	if (farm.isPool) {
		return new BigNumber(farm.tokenPriceVsQuote)
	}

	if (farm.lpTotalSupply && farm.lpTotalInQuoteToken) {
		// Total value of base token in LP
		const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
		// Double it to get overall value in LP
		const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
		// Divide total value of all tokens, by the number of LP tokens
		const totalLpTokens = getBalanceAmount(new BigNumber(farm.lpTotalSupply))
		lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
	}

	return lpTokenPrice
}

export const useLpTokenPrice = (symbol: string, isPigFarm: boolean) => {
	const farm = useFarmFromLpSymbol(symbol, isPigFarm)
	const farmTokenPriceInUsd = useBusdPriceFromPidPigs(farm.pid)
	let lpTokenPrice = BIG_ZERO

	if (farm.isPool) {
		return new BigNumber(farm.tokenPriceVsQuote)
	}

	if (farm.lpTotalSupply && farm.lpTotalInQuoteToken && farm.tokenAmountTotal && farmTokenPriceInUsd) {
		// Total value of base token in LP
		const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
		// Double it to get overall value in LP
		const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
		// Divide total value of all tokens, by the number of LP tokens
		const totalLpTokens = getBalanceAmount(new BigNumber(farm.lpTotalSupply))
		lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
	}

	return lpTokenPrice
}

// /!\ Deprecated , use the BUSD hook in /hooks
