import { PiggyBank } from 'state/piggybank'
import { Response } from 'state'

import getPigsContract from 'utils/getContracts'
import { ethers } from 'ethers'
// import BigNumber from 'bignumber.js'
import { calculatePiglets, getPiggyBanks } from './helpers'

export const fetchPiggyBankData = async (account: string): Promise<PiggyBank> => {
	let piggyBank: PiggyBank

	try {
		piggyBank = await getPiggyBanks(account)
	} catch (e) {
		console.error('fetchPiggyBankData error: ', e)
	}

	return piggyBank
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

export const buyMoreTrufflesToAPiggyBank = async (id: string, amount: string, referee: string, signer: ethers.Signer): Promise<Response> => {
	const { piggyBankContract } = getPigsContract()

	try {
		await piggyBankContract.connect(signer).buyMoreTrufflesToAPiggyBank(id, amount, referee, { gasLimit: 2500000 })
		return {
			success: true,
			message: 'Depsit Successful!',
		}
	} catch (e) {
		console.error('fetchPiggyBankData error: ', e)
		return {
			success: false,
			message: e.code === 4001 ? 'User Rejected Transaction!' : 'An error occured. Try again!',
		}
	}
}
