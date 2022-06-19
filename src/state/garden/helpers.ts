import multicall, { multicallv2 } from 'utils/multicall'
import { Garden } from 'state/types'
import GardenABI from 'config/Iabi/DripGarden.json'
import { DripGardenAddress, BUSDAddress, DripTokenAddress, DripBusdLpTokenAddress } from 'config/constants'
import BigNumber from 'bignumber.js'
import erc20 from 'config/Iabi/erc20.json'

export const calculateMiners = async (amount: string) => {
	let _res = new BigNumber(0).toJSON()
	try {
		const calls = [
			{
				address: DripGardenAddress,
				name: 'calculateSeedsBuySimple',
				params: [amount],
			},
		]
		const [res] = await multicallv2(GardenABI, calls)
		_res = new BigNumber(res).toJSON()
	} catch (e) {
		console.error('Garden user err')
	}

	return _res
}

export const getGarden = async (account: string): Promise<Garden> => {
	let _plants = new BigNumber(0)
	let _seeds = new BigNumber(0)
	let _claimed = new BigNumber(0)
	let _last = new BigNumber(0)
	let _secondsUntilFull = new BigNumber(0)
	let _referrals = '0x000'

	if (account) {
		try {
			const calls = [
				{
					address: DripGardenAddress,
					name: 'hatcheryPlants',
					params: [account],
				},
				{
					address: DripGardenAddress,
					name: 'getUserSeeds',
					params: [account],
				},
				{
					address: DripGardenAddress,
					name: 'claimedSeeds',
					params: [account],
				},
				{
					address: DripGardenAddress,
					name: 'lastPlant',
					params: [account],
				},
				{
					address: DripGardenAddress,
					name: 'referrals',
					params: [account],
				},
			]

			const [hatcheryPlants, userSeeds, claimedSeeds, lastHatch, referrals] = await multicallv2(GardenABI, calls)
			_plants = new BigNumber(hatcheryPlants)
			_seeds = new BigNumber(userSeeds)
			_claimed = new BigNumber(claimedSeeds)
			_last = new BigNumber(lastHatch)
			_referrals = referrals[0]
		} catch (e) {
			console.error('Garden user err: ', e)
			console.error('account:', account)
		}
	}

	// console.error("XXXXXXXXXXX GARDEN GAME THING XXXXXXXXXXXXX")

	let _availableSeeds = new BigNumber(0).toJSON()

	if (_seeds.toString() !== '0') {
		try {
			const calls = [
				{
					address: DripGardenAddress,
					name: 'calculateSeedSell',
					params: [_seeds.toString()],
				},
			]
			const [availableEggs] = await multicallv2(GardenABI, calls)

			_availableSeeds = new BigNumber(availableEggs).times(0.95).dividedBy(1e18).decimalPlaces(3).toJSON()
		} catch (e) {
			console.error('Miner calculate eggs')
		}
	}

	const callsErc20 = [
		// Balance of token in the LP contract
		{
			address: DripTokenAddress,
			name: 'balanceOf',
			params: [DripBusdLpTokenAddress],
		},
		// Balance of quote token on LP contract
		{
			address: BUSDAddress,
			name: 'balanceOf',
			params: [DripBusdLpTokenAddress],
		},
		// Total supply of LP tokens
		{
			address: DripBusdLpTokenAddress,
			name: 'totalSupply',
		},
	]

	let tokenBalanceLP
	let busdTokenBalanceLP
	let lpTotalSupply
	let userBalance = '0'
	let userLPAllowance = '0'

	if (account) {
		callsErc20.push({
			address: DripBusdLpTokenAddress,
			name: 'balanceOf',
			params: [account],
		})
		callsErc20.push({
			address: DripBusdLpTokenAddress,
			name: 'allowance',
			params: [account, DripGardenAddress],
		})

		const [_tokenBalanceLP, _busdTokenBalanceLP, _lpTotalSupply, _userLPBalance, _userLPAllowance] = await multicall(erc20, callsErc20)
		tokenBalanceLP = _tokenBalanceLP
		busdTokenBalanceLP = _busdTokenBalanceLP
		lpTotalSupply = _lpTotalSupply
		userLPAllowance = new BigNumber(_userLPAllowance).toJSON()
		userBalance = new BigNumber(_userLPBalance).toJSON()
	} else {
		const [_tokenBalanceLP, _busdTokenBalanceLP, _lpTotalSupply] = await multicall(erc20, callsErc20)
		tokenBalanceLP = _tokenBalanceLP
		busdTokenBalanceLP = _busdTokenBalanceLP
		lpTotalSupply = _lpTotalSupply
	}

	// const [tokenBalanceLP, busdTokenBalanceLP, lpTotalSupply] = await multicall(erc20, callsErc20)

	let _marketSeeds
	let _seedsToPlant
	let _balance
	let _timeMultiplier
	let _balanceMultiplier

	try {
		const calls = [
			{
				address: DripGardenAddress,
				name: 'marketSeeds',
			},
			{
				address: DripGardenAddress,
				name: 'SEEDS_TO_GROW_1PLANT',
			},
			{
				address: DripGardenAddress,
				name: 'getBalance',
			},
			{
				address: DripGardenAddress,
				name: 'currentTimeMultiplier',
			},
			{
				address: DripGardenAddress,
				name: 'currentBalanceMultiplier',
			},
		]
		const [marketEggs, seedsToPlant, balance, timeMultiplier, balanceMultiplier] = await multicallv2(GardenABI, calls)
		_marketSeeds = new BigNumber(marketEggs).toJSON()
		_seedsToPlant = new BigNumber(seedsToPlant).toJSON()
		_balance = new BigNumber(balance).dividedBy(1e18).decimalPlaces(2).toJSON()
		_timeMultiplier = new BigNumber(timeMultiplier).toJSON()
		_balanceMultiplier = new BigNumber(balanceMultiplier).toJSON()
	} catch (e) {
		console.error('something wrong garden', e)
		return null
	}

	const seedsToPlant1 = new BigNumber(2592000)
	const isMinersZero = _plants.isEqualTo(new BigNumber('0'))

	if (!isMinersZero) {
		// let _secondsUntilFull = seedsToPlant1-eggs/lastNumMiners
		const P1 = _seeds.div(_plants)
		_secondsUntilFull = seedsToPlant1.minus(P1)
	}

	const BG1 = new BigNumber(busdTokenBalanceLP).multipliedBy('2')
	const BG2 = new BigNumber(lpTotalSupply)
	const pricePerLP = BG1.div(BG2)
	const usdValue = pricePerLP.multipliedBy(_availableSeeds).decimalPlaces(2)

	return {
		marketSeeds: _marketSeeds,
		seedsToHatch: _seedsToPlant,
		balance: _balance,
		timeMultiplier: _timeMultiplier,
		balanceMultiplier: _balanceMultiplier,
		userData: {
			lpBalance: userBalance,
			lpAllowance: userLPAllowance,
			plants: _plants.toJSON(),
			seeds: _seeds.toJSON(),
			availableSeeds: _availableSeeds,
			secondsUntilFull: _secondsUntilFull.toJSON(),
			claimed: _claimed.toJSON(),
			last: _last.toJSON(),
			referrals: _referrals,
			usdValue: usdValue.toJSON(),
		},
	}
}

/**
 * Gets on-chain data and merges it with the existing static list of teams
 */
// export const getTeams = async (): Promise<TeamsById> => {
//   try {
//     const teamsById = teamsList.reduce((accum, team) => {
//       return {
//         ...accum,
//         [team.id]: team,
//       }
//     }, {})
//     const nbTeams = await profileContract.numberTeams()
//
//     const calls = []
//     for (let i = 1; i <= nbTeams; i++) {
//       calls.push({
//         address: getPancakeProfileAddress(),
//         name: 'getTeamProfile',
//         params: [i],
//       })
//     }
//     const teamData = await multicallv2(profileABI, calls)
//
//     const onChainTeamData = teamData.reduce((accum, team, index) => {
//       const { 0: teamName, 2: numberUsers, 3: numberPoints, 4: isJoinable } = team
//
//       return {
//         ...accum,
//         [index + 1]: {
//           name: teamName,
//           users: numberUsers.toNumber(),
//           points: numberPoints.toNumber(),
//           isJoinable,
//         },
//       }
//     }, {})
//
//     return merge({}, teamsById, onChainTeamData)
//   } catch (error) {
//     return null
//   }
// }
