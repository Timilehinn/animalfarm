import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import getPigsContract from '../utils/getContracts'

export const ClaimToPiggyBank = async (pigsAmount: string, busdAmount: string, weeksToLock: number, signer: ethers.Signer) => {
	const { pigsCreditContract } = getPigsContract()

	let res = {
		success: false,
		data: null,
	}

	try {
		const result: ethers.BigNumber = await pigsCreditContract.connect(signer).claimPigsV2ToPiggyBank(pigsAmount, busdAmount, weeksToLock)
		res = {
			success: true,
			data: null,
		}
		console.log(result)
	} catch (err) {
		res = {
			success: false,
			data: null,
		}
		console.log(err)
	}

	return res
}
