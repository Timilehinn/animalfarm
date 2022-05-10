import multicall, { multicallv2 } from 'utils/multicall'
import { PiggyBank } from 'state/piggybank'
import PiggyBankABI from 'config/abi/PiggyBankV2.json'
import BigNumber from 'bignumber.js'
import { PiggyBankAddress, BUSDAddress, AnimalFarmTokens } from 'config/constants'
import erc20 from '../../config/Iabi/erc20.json'

export const calculatePiglets = async (amount: string) => {
	let _res = new BigNumber(0).toJSON()
	try {
		const calls = [
			{
				address: PiggyBankAddress,
				name: 'calculateTrufflesBuySimple',
				params: [amount],
			},
		]
		const [res] = await multicallv2(PiggyBankABI, calls)
		_res = new BigNumber(res).toJSON()
	} catch (e) {
		console.error('Piggybank user err')
	}

	return _res
}

export const getPiggyBanks = async (account: string): Promise<PiggyBank> => {
	const _userPiggyBanks = []
	const _referrals = []

	// let referrerAddress = Cookies.get('piggybankreferrer')
	// if (referrerAddress === undefined) {
	//   referrerAddress = '0x0000000000000000000000000000000000000000'
	// } else {
	//   referrerAddress = `0x${referrerAddress}`
	// }

	const callsErc20 = [
		// Balance of token in the LP contract
		{
			address: AnimalFarmTokens.pigsToken.address,
			name: 'balanceOf',
			params: [AnimalFarmTokens.pigsToken.BUSD_LP],
		},
		// Balance of quote token on LP contract
		{
			address: BUSDAddress,
			name: 'balanceOf',
			params: [AnimalFarmTokens.pigsToken.BUSD_LP],
		},
		// Total supply of LP tokens
		{
			address: AnimalFarmTokens.pigsToken.BUSD_LP,
			name: 'totalSupply',
		},
	]

	let tokenBalanceLP
	let busdTokenBalanceLP
	let lpTotalSupply
	let userLPBalance
	let userBalance = '0'
	let userLPAllowance = '0'

	if (account) {
		callsErc20.push({
			address: AnimalFarmTokens.pigsToken.BUSD_LP,
			name: 'balanceOf',
			params: [account],
		})
		callsErc20.push({
			address: AnimalFarmTokens.pigsToken.BUSD_LP,
			name: 'allowance',
			params: [account, PiggyBankAddress],
		})

		const [_tokenBalanceLP, _busdTokenBalanceLP, _lpTotalSupply, _userLPBalance, _userLPAllowance] = await multicall(erc20, callsErc20)
		tokenBalanceLP = _tokenBalanceLP
		busdTokenBalanceLP = _busdTokenBalanceLP
		lpTotalSupply = _lpTotalSupply
		userLPBalance = _userLPBalance
		userLPAllowance = new BigNumber(_userLPAllowance).toJSON()
		userBalance = new BigNumber(userLPBalance.balance._hex).dividedBy(1e18).decimalPlaces(2).toJSON()
	} else {
		const [_tokenBalanceLP, _busdTokenBalanceLP, _lpTotalSupply] = await multicall(erc20, callsErc20)
		tokenBalanceLP = _tokenBalanceLP
		busdTokenBalanceLP = _busdTokenBalanceLP
		lpTotalSupply = _lpTotalSupply
	}

	if (account) {
		try {
			const calls = [
				{
					address: PiggyBankAddress,
					name: 'getMyPiggyBanks',
					params: [account],
				},
				{
					address: PiggyBankAddress,
					name: 'getReferralList',
					params: [account],
				},
			]

			const [userPiggyBanks, referrals] = await multicallv2(PiggyBankABI, calls)
			const userPiggyBanks__ = userPiggyBanks[0]

			const infoCalls = []

			userPiggyBanks__.forEach((data) => {
				const ID = data.ID

				infoCalls.push({
					address: PiggyBankAddress,
					name: 'getUserTruffles',
					params: [account, ID.toString()],
				})
			})
			const userTruffles = await multicallv2(PiggyBankABI, infoCalls)
			/// /// /// /// ///

			const calcCalls = []
			const skipIndex = []

			userTruffles.forEach((data, index) => {
				let truffles = new BigNumber(data[0]._hex).toString()
				if (truffles === '0') {
					truffles = '99999'
					skipIndex.push(index)
				}

				calcCalls.push({
					address: PiggyBankAddress,
					name: 'calculateTruffleSell',
					params: [truffles.toString()],
				})
			})
			const userSeedSell = await multicallv2(PiggyBankABI, calcCalls)
			// console.log("userTruffleSell", userSeedSell)

			/// /// /// /// ///
			const daySinceLockCalls = []
			userPiggyBanks__.forEach((data) => {
				const ID = data.ID
				daySinceLockCalls.push({
					address: PiggyBankAddress,
					name: 'getTimestampLeftSinceLock',
					params: [account, ID.toString()],
				})
			})
			const userTimestamp = await multicallv2(PiggyBankABI, daySinceLockCalls)

			userPiggyBanks__.forEach((data, index) => {
				let usdValue

				const userCalculatedSell = userSeedSell[index][0]._hex
				// console.log("userCalculatedSell:", userCalculatedSell.toString())
				// console.log("skipIndex:", skipIndex)
				if (skipIndex.includes(index)) {
					usdValue = new BigNumber('0')
				} else {
					const remainTruf = new BigNumber(userCalculatedSell).times(0.95).dividedBy(1e18).decimalPlaces(3).toJSON()
					const BG1 = new BigNumber(busdTokenBalanceLP).multipliedBy('2')
					const BG2 = new BigNumber(lpTotalSupply)
					const pricePerLP = BG1.div(BG2)
					usdValue = pricePerLP.multipliedBy(remainTruf).decimalPlaces(2)
				}

				/** Construct PiggyBankInfo Struct */
				const ID = new BigNumber(data.ID._hex)
				const { claimedTruffles, isMaxPayOut, isStakeOn, stakeType, trufflesSold } = data
				const hatcheryPiglets = new BigNumber(data.hatcheryPiglets._hex)
				const availableTruffles = new BigNumber(userTruffles[index][0]._hex)

				const lastCompounded = new BigNumber(data.lastCompounded._hex)
				const lastFeeding = new BigNumber(data.lastFeeding._hex)
				const paddedPrecisionValue = new BigNumber(data.paddedPrecisionValue._hex)

				const trufflesUsed = new BigNumber(data.trufflesUsed._hex)

				const timeLeftSinceLock = new BigNumber(userTimestamp[index][0]._hex)

				// lockBonus
				const { bonus, dayLastDistributed, distributedBonus, isExpired } = data.lockBonus

				// truffle locker
				const duration = new BigNumber(data.truffleLocker.duration._hex)
				const durationTimestamp = new BigNumber(data.truffleLocker.durationTimestamp._hex)
				const startLockTimestamp = new BigNumber(data.truffleLocker.startLockTimestamp._hex)

				const stake = {
					ID: ID.toJSON(),
					claimedTruffles: claimedTruffles.toJSON(),
					hatcheryPiglets: hatcheryPiglets.toJSON(),
					availableTruffles: availableTruffles ? availableTruffles.toJSON() : '0',
					isMaxPayOut,
					isStakeOn,
					lastCompounded: lastCompounded.toJSON(),
					lastFeeding: lastFeeding.toJSON(),
					trufflesSold: trufflesSold.toJSON(),
					trufflesUsed: trufflesUsed.toJSON(),
					timeLeftSinceLock: timeLeftSinceLock.toJSON(),
					usdValue: usdValue.toJSON(),
					paddedPrecisionValue: paddedPrecisionValue.toJSON(),
					stakeType,

					lockBonus: {
						bonus: bonus.toJSON(),
						dayLastDistributed: dayLastDistributed.toJSON(),
						distributedBonus: distributedBonus.toJSON(),
						isExpired,
					},

					truffleLocker: {
						duration: duration.toJSON(),
						durationTimestamp: durationTimestamp.toJSON(),
						startLockTimestamp: startLockTimestamp.toJSON(),
					},
				}

				_userPiggyBanks.push(stake)
			})

			referrals[0].forEach((refData) => {
				const ref = {
					amount: new BigNumber(refData.amount._hex).div(1e18).toJSON(),
					lockDuration: new BigNumber(refData.lockDuration._hex).toJSON(),
					referral: refData.referral,
					timestamp: new BigNumber(refData.timestamp._hex).toJSON(),
				}
				_referrals.push(ref)
			})
		} catch (e) {
			console.error('PiggyBank user err: ', e)
			console.error('account:', account)
		}
	}

	let _marketTruffles
	let _balance

	try {
		const calls = [
			{
				address: PiggyBankAddress,
				name: 'marketTruffles',
			},
			{
				address: PiggyBankAddress,
				name: 'getBalance',
			},
		]
		const [marketTruffles, balance] = await multicallv2(PiggyBankABI, calls)
		_marketTruffles = new BigNumber(marketTruffles).toJSON()
		_balance = new BigNumber(balance).dividedBy(1e18).decimalPlaces(2).toJSON()
	} catch (e) {
		console.error('something wrong piggybank', e)
		return null
	}

	const trufflesToFeed1Piglet = new BigNumber(2592000)
	// const isPigletsZero = _plants.isEqualTo(new BigNumber("0"))
	//
	// if (!isMinersZero){
	//   // let _secondsUntilFull = seedsToPlant1-eggs/lastNumMiners
	//   const P1 = _seeds.div(_plants)
	//   _secondsUntilFull = seedsToPlant1.minus(P1)
	// }

	// const BG1 = new BigNumber(busdTokenBalanceLP).multipliedBy("2")
	// const BG2 = new BigNumber(lpTotalSupply)
	// const pricePerLP = BG1.div(BG2)
	// const usdValue = pricePerLP.multipliedBy(_availableSeeds).decimalPlaces(2)
	const usdValue = '123'

	// console.log("pricePerLP:", pricePerLP.toString())
	// console.log("pricePerLP:", _availableSeeds.toString())

	return {
		marketTruffles: _marketTruffles,
		balance: _balance,
		userData: {
			lpBalance: userBalance,
			lpAllowance: userLPAllowance,
			userPiggyBanks: _userPiggyBanks,
			referrals: _referrals,
			usdValue,
		},
	}
}
