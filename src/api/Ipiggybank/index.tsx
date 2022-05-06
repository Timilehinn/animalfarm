import { PiggyBank } from 'state/piggybank'

// import getPigsContract from 'utils/getContracts'
// import { ethers } from 'ethers'
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
