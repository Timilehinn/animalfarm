import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, BSC_BLOCK_TIME, PIG_PER_YEAR } from 'config'
import lpAprs from 'config/constants/lpAprs.json'

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (stakingTokenPrice: number, rewardTokenPrice: number, totalStaked: number, tokenPerBlock: number): number => {
	const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
	const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
	const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
	return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApr = (poolWeight: BigNumber, cakePriceUsd: BigNumber, poolLiquidityUsd: BigNumber, farmAddress: string, tokensPerBlock: BigNumber): { cakeRewardsApr: number; lpRewardsApr: number } => {
	const tokensPerYear = tokensPerBlock.times(BLOCKS_PER_YEAR)

	const yearlyPigRewardAllocation = tokensPerYear.times(poolWeight)
	const pigRewardsApr = yearlyPigRewardAllocation.times(cakePriceUsd).div(poolLiquidityUsd).times(100)
	let pigRewardsAprAsNumber = null
	if (!pigRewardsApr.isNaN() && pigRewardsApr.isFinite()) {
		pigRewardsAprAsNumber = pigRewardsApr.toNumber()
	}
	const lpRewardsApr = lpAprs[farmAddress?.toLocaleLowerCase()] ?? 0
	return { cakeRewardsApr: pigRewardsAprAsNumber, lpRewardsApr }
}

export const getFarmGenericApr = (poolWeight: BigNumber, tokenPriceUsd: BigNumber, poolLiquidityUsd: BigNumber, farmAddress: string, tokensPerBlock: number): { rewardsApr: number; lpRewardsApr: number } => {
	// debugger
	const yearlyTokenRewardAllocation = CalculateTokensPerYear(tokensPerBlock).times(poolWeight)
	// console.log("yearlyTokenRewardAllocation:", yearlyTokenRewardAllocation.toString())

	const rewardsApr = yearlyTokenRewardAllocation.times(tokenPriceUsd).div(poolLiquidityUsd).times(100)
	// console.log("rewardsApr:", rewardsApr.toString())

	let pigRewardsAprAsNumber = null
	if (!rewardsApr.isNaN() && rewardsApr.isFinite()) {
		pigRewardsAprAsNumber = rewardsApr.toNumber()
	}
	const lpRewardsApr = lpAprs[farmAddress?.toLocaleLowerCase()] ?? 0
	return { rewardsApr: pigRewardsAprAsNumber, lpRewardsApr }
}

function CalculateTokensPerYear(tokenPerBlock) {
	const TOKEN_PER_BLOCK = new BigNumber(tokenPerBlock)
	return TOKEN_PER_BLOCK.times(BLOCKS_PER_YEAR)
}

export default null
