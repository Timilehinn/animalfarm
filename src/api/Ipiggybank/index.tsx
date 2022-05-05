import { PiggyBankState } from 'state/piggybank'

import getPigsContract from 'utils/getContracts'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { calculatePiglets, getPiggyBanks } from './helpers'


export const fetchPiggyBankData = async (account: string): Promise<PiggyBankState> => {
	let piggyBanks

	try {
		piggyBanks = await getPiggyBanks(account)
	} catch (e) {
		console.error('fetchPiggyBankData error: ', e)
	}

	return piggyBanks
}

// export const fetchCalcMiner =  (amount: string) => async (dispatch) => {
//   const pigletAmount = await calculatePiglets(amount)
//   console.log("pigletAmount: ", pigletAmount)
//   return pigletAmount

// }

// export const fetchPiggybank = (account: string) => async (dispatch) => {
//   try {
//     dispatch(fetchStart())
//     const miner = await getPiggyBank(account)
//     dispatch(piggybankFetchSucceeded(miner))
//   } catch (error) {
//     dispatch(fetchFailed())
//   }
// }

export const getTotalLpLocked = async () => {
	const { piggyBankContract } = getPigsContract()

	let  lpLocked
	try {
		const result: ethers.BigNumber = await piggyBankContract.getBalance()
		const balance = ethers.BigNumber.from(result).toString()

		lpLocked = {
			amount: balance,
			amountString: new BigNumber(balance).toFormat(0),
		}
		console.log(result)
	} catch (err) {
		console.log(err)
	}

	return lpLocked
}