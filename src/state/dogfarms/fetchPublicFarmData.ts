import BigNumber from 'bignumber.js'
import masterchefDogsABI from 'config/abi/MasterChefDogs.json'
import StrategyChefABI from 'config/abi/StrategyChef.json'
import erc20 from 'config/Iabi/erc20.json'
import { getAddress, getDogsMasterChefAddress } from 'utils/addressHelpers'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import multicall from 'utils/multicall'
import { Farm, SerializedBigNumber } from '../types'

type PublicFarmData = {
	tokenAmountMc: SerializedBigNumber
	quoteTokenAmountMc: SerializedBigNumber
	tokenAmountTotal: SerializedBigNumber
	quoteTokenAmountTotal: SerializedBigNumber
	lpTotalInQuoteToken: SerializedBigNumber
	lpTotalSupply: SerializedBigNumber
	tokenPriceVsQuote: SerializedBigNumber
	poolWeight: SerializedBigNumber
	multiplier: string
	depositFee?: string
	lockupPeriod: string
	isPaused?: boolean
}

const fetchFarm = async (farm: Farm): Promise<PublicFarmData> => {
	const { pid, lpAddresses, token, quoteToken } = farm
	const lpAddress = getAddress(lpAddresses)

	// Local Vars
	let allocPoint = BIG_ZERO
	let tokenPriceVsQuote = BIG_ZERO
	let depositFee = '0%'
	let poolWeight = BIG_ZERO

	let xxx = lpAddress
	if (farm.isPool) {
		xxx = getAddress(farm.lpBusdAddress)
	}

	const calls = [
		// Balance of token in the LP contract
		{
			address: getAddress(token.address),
			name: 'balanceOf',
			params: [xxx],
		},
		// Balance of quote token on LP contract
		{
			address: getAddress(quoteToken.address),
			name: 'balanceOf',
			params: [xxx],
		},
		// Balance of LP tokens in the master chef contract
		{
			address: lpAddress,
			name: 'balanceOf',
			params: [getDogsMasterChefAddress()],
		},
		// Total supply of LP tokens
		{
			address: xxx,
			name: 'totalSupply',
		},
		// Token decimals
		{
			address: getAddress(token.address),
			name: 'decimals',
		},
		// Quote token decimals
		{
			address: getAddress(quoteToken.address),
			name: 'decimals',
		},
	]

	const [tokenBalanceLP, quoteTokenBalanceLP, lpTokenBalanceMC_, lpTotalSupply, tokenDecimals, quoteTokenDecimals] = await multicall(erc20, calls)
	let lpTokenBalanceMC = lpTokenBalanceMC_

	// Only make masterchef calls if farm has pid
	const [info, totalAllocPoint] =
		pid || pid === 0
			? await multicall(masterchefDogsABI, [
					{
						address: getDogsMasterChefAddress(),
						name: 'poolInfo',
						params: [pid],
					},
					{
						address: getDogsMasterChefAddress(),
						name: 'totalAllocPoint',
					},
			  ])
			: [null, null]

	allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO
	depositFee = info ? info.depositFeeBP?._hex : '0'
	poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
	lpTokenBalanceMC = info ? info.lpSupply?._hex : BIG_ZERO
	const strategyContractAddress = info ? info.strategy : undefined

	// Get Strategy Status
	let isPaused = false
	if (strategyContractAddress) {
		const [_isPaused] = await multicall(StrategyChefABI, [
			{
				address: strategyContractAddress,
				name: 'paused',
			},
		])
		isPaused = _isPaused[0]
	}

	// console.log("info:", info)

	// Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
	const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

	// Raw amount of token in the LP, including those not staked
	// @bb this would be total supply in pool?
	const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))

	const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

	// Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
	const tokenAmountMc = farm.isPool ? new BigNumber(lpTokenBalanceMC) : tokenAmountTotal.times(lpTokenRatio)
	const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

	// Total staked in LP, in quote token value
	const lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2))
	tokenPriceVsQuote = farm.isPool ? quoteTokenAmountTotal.div(tokenAmountTotal) : quoteTokenAmountTotal.div(tokenAmountTotal)
	const harvestInterval = info ? new BigNumber(info.harvestInterval?._hex) : BIG_ZERO

	return {
		isPaused,
		tokenAmountMc: tokenAmountMc.toJSON(),
		quoteTokenAmountMc: quoteTokenAmountMc.toJSON(), // useless
		tokenAmountTotal: tokenAmountTotal.toJSON(),
		quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
		lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
		lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
		tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
		poolWeight: poolWeight.toJSON(),
		multiplier: `${allocPoint.div(100).toString()}X`,
		depositFee: `${depositFee.toString()}`,
		lockupPeriod: harvestInterval.toJSON(),
	}
}

export default fetchFarm
