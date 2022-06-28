/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { farmsConfig } from 'config/constants'
// import useRefresh from 'hooks/useRefresh'
import { fetchDogFarmEmissionsAsync, fetchDogFarmsPublicDataAsync, fetchDogFarmUserDataAsync, nonArchivedFarms } from '.'
import { Farm, FarmsState, FarmEmissions } from '../types'

export const usePollDogFarmsData = (includeArchive = false) => {
	const dispatch = useAppDispatch()
	// const { slowRefresh } = useRefresh()
	const { account } = useWeb3React()

	// dispatch(fetchDogFarmEmissionsAsync())
	useEffect(() => {
		const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
		const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

		dispatch(fetchDogFarmEmissionsAsync())
		dispatch(fetchDogFarmsPublicDataAsync(pids))

		if (account) {
			dispatch(fetchDogFarmUserDataAsync({ account, pids }))
		}
	}, [includeArchive, account])
}

/**
 * Fetches the "core" farm data used globally
 * 251 = CAKE-BNB LP
 * 252 = BUSD-BNB LP
 */
export const usePollDogCoreFarmData = () => {
	const dispatch = useAppDispatch()
	// const { fastRefresh } = useRefresh()

	// dispatch(fetchDogFarmEmissionsAsync())

	useEffect(() => {
		console.log('Use Effect DOGS is running....')
		dispatch(fetchDogFarmEmissionsAsync())
		dispatch(fetchDogFarmsPublicDataAsync([0, 1]))
	}, [])
}

export const useDogFarms = (): FarmsState => {
	const farms = useAppSelector((state) => state.dogFarmsReducer)
	return farms
}

export const useDogFarmFromPid = (pid): Farm => {
	const farm = useAppSelector((state) => state.dogFarmsReducer.data.find((f) => f.pid === pid))
	return farm
}

export const useDogFarmEmissions = (): FarmEmissions => {
	const emissions = useAppSelector((state) => state.dogFarmsReducer.emissions)
	return emissions
}

export const useDogFarmFromLpSymbol = (lpSymbol: string): Farm => {
	const farm = useAppSelector((state) => state.dogFarmsReducer.data.find((f) => f.lpSymbol === lpSymbol))
	return farm
}

export const useDogFarmUser = (pid) => {
	const farm = useDogFarmFromPid(pid)

	return {
		allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
		tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
		stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
		earningsDogs: farm.userData ? new BigNumber(farm.userData.earningsDogs) : BIG_ZERO,
		earningsBusd: farm.userData ? new BigNumber(farm.userData.earningsBusd) : BIG_ZERO,
	}
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPidDogs = (pid: number): BigNumber => {
	const farm = useDogFarmFromPid(pid)
	return farm && new BigNumber(farm.token.busdPrice)
}

export const useLpTokenPriceDogs = (symbol: string) => {
	const farm = useDogFarmFromLpSymbol(symbol)
	const farmTokenPriceInUsd = useBusdPriceFromPidDogs(farm.pid)
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
