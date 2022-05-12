import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { PiggyBankAddress } from 'config/constants'
import getContract from '../utils/getContracts'

export const checkAllowance = async (ownerAddress: string, spenderAddress: string) => {
	const { busdContract } = getContract()
	let allowance

	try {
		const result: ethers.BigNumber = await busdContract.allowance(ownerAddress, spenderAddress)
		const balance = ethers.BigNumber.from(result).toString()
		allowance = {
			allowance: balance,
		}
		console.log(result)
	} catch (err) {
		console.log(err)
	}

	return allowance
}

export const approveBusd = async (spenderAddress: string, amount: string, signer: ethers.Signer) => {
	const { busdContract } = getContract()
	let approval

	// try {

	// 	console.log('success')
	// } catch (err) {
	// 	console.log(err)
	// }

	// return approval
	await busdContract.connect(signer).approve(spenderAddress, amount)
}

// pigs/busd

export const checkPigBusdAllowance = async (ownerAddress: string, spenderAddress: string) => {
	const { pigsBusdLpContract } = getContract()
	let allowance

	try {
		const result: ethers.BigNumber = await pigsBusdLpContract.allowance(ownerAddress, spenderAddress)
		const balance = ethers.BigNumber.from(result).toString()
		allowance = {
			allowance: balance,
		}
		console.log(result)
	} catch (err) {
		console.log(err)
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
		console.log('success')
	} catch (err) {
		console.log(err)
	}

	return approval
}
