import { ethers } from 'ethers'
import { PiggyBankAddress } from 'config/constants'
import getContract from '../utils/getContracts'

// Deprecated: - Will be removed
export const checkAllowance = async (ownerAddress: string, spenderAddress: string) => {
	const { busdContract } = getContract()
	let allowance

	try {
		const result: ethers.BigNumber = await busdContract.allowance(ownerAddress, spenderAddress)
		const balance = ethers.BigNumber.from(result).toString()
		allowance = {
			allowance: balance,
		}
	} catch (err) {
		console.error(err)
	}

	return allowance
}

export const approveBusd = async (spenderAddress: string, amount: string, signer: ethers.Signer) => {
	const { busdContract } = getContract()

	await busdContract.connect(signer).approve(spenderAddress, amount)
}

export const checkPigBusdAllowance = async (ownerAddress: string, spenderAddress: string) => {
	const { pigsBusdLpContract } = getContract()
	let allowance

	try {
		const result: ethers.BigNumber = await pigsBusdLpContract.allowance(ownerAddress, spenderAddress)
		const balance = ethers.BigNumber.from(result).toString()
		allowance = {
			allowance: balance,
		}
	} catch (err) {
		console.error(err)
	}

	return allowance
}

export const approvePiggyBankForPigBusdLP = async (amount: string, signer: ethers.Signer) => {
	const { pigsBusdLpContract } = getContract()
	let approval

	try {
		await pigsBusdLpContract.connect(signer).approve(PiggyBankAddress, amount)
		// const balance = ethers.BigNumber.from(result).toString()
		// approval={
		//     approval: balance
		// }
		// console.log(result);
	} catch (err) {
		console.error(err)
	}

	return approval
}
