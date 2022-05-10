import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import getPigsContract from '../utils/getContracts'

export const ClaimToPiggyBank = async (pigsAmount: string, busdAmount: string, weeksToLock: number, tolerance: string, signer: ethers.Signer) => {
	const { pigsCreditContract } = getPigsContract()

	const pigsAmountMin = new BigNumber(pigsAmount).multipliedBy(new BigNumber(100).minus(tolerance).dividedBy(100))
	const busdAmountMin = new BigNumber(busdAmount).multipliedBy(new BigNumber(100).minus(tolerance).dividedBy(100))

	let res = {
		success: false,
		data: null,
	}

	try {
		await pigsCreditContract.connect(signer).claimPigsV2ToPiggyBank(pigsAmount, busdAmount, weeksToLock, pigsAmountMin.toString(), busdAmountMin.toString())
		res = {
			success: true,
			data: null,
		}
	} catch (err) {
		res = {
			success: false,
			data: null,
		}
		console.log(err)
	}

	return res
}
