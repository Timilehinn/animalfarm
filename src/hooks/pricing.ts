import BigNumber from 'bignumber.js'
import { Farm } from 'state/types'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useDogFarmFromPid, useDogFarms } from '../state/dogfarms/hooks'
import { usePigFarmFromPid, usePigFarms } from '../state/pigfarms/hooks'

export const usePricePigBusd = (): BigNumber => {
	const farm = useDogFarmFromPid(0)
	return new BigNumber(farm.token.busdPrice)
}

// /!\ Deprecated , use the BUSD hook in /hooks
export const usePriceDogBusd = (): BigNumber => {
	const farm = usePigFarmFromPid(0)
	return new BigNumber(farm.token.busdPrice)
}

export const useTotalValue = (): BigNumber => {
	const { data: dogFarms } = useDogFarms()
	const { data: pigFarms } = usePigFarms()

	let value = new BigNumber(0)

	for (let i = 0; i < dogFarms.length; i++) {
		const farm = dogFarms[i]
		if (farm.lpTotalInQuoteToken) {
			let totalLiquidity
			if (farm.isPool) {
				const totalMCStacked = getBalanceAmount(new BigNumber(farm.tokenAmountMc))
				totalLiquidity = totalMCStacked.times(farm.tokenPriceVsQuote)
			} else {
				totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
			}

			value = value.plus(totalLiquidity)
		}
	}
	// console.log("--- useTotalValue ---")
	// console.log("value:", value.toString())

	for (let i = 0; i < pigFarms.length; i++) {
		const farm = pigFarms[i]
		if (farm.lpTotalInQuoteToken !== 'NaN' && farm.lpTotalInQuoteToken !== '0') {
			let totalLiquidity
			if (farm.isPool) {
				const totalMCStacked = getBalanceAmount(new BigNumber(farm.tokenAmountMc))
				totalLiquidity = totalMCStacked.times(farm.tokenPriceVsQuote)
			} else {
				totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
			}

			value = value.plus(totalLiquidity)
		}
	}
	// console.log("value after:", value.toString())

	return value
}
