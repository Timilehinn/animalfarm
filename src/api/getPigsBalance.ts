import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import type { Balance } from 'state/balances'
import { AnimalFarmTokens } from 'config/constants'
import { getPigsBUSDPrice } from 'utils/getPrice'
import getPigsContract from '../utils/getContracts'

// export const getPigsBalance = async (account: string) => {
// 	const { pigsTokenContract } = getPigsContract()

// 	let pigsBalance
// 	try {
// 		const result: ethers.BigNumber = await pigsTokenContract.balanceOf(account)
// 		const balance = ethers.BigNumber.from(result).toString()

// 		// vaultBtcBalance = {
// 		// 			amount: balance,
// 		// 			value,
// 		// 			amountString: new BigNumber(balance).toFormat(0),
// 		// 			valueString: new BigNumber(value).toFormat(2),
// 		// 			token: VaultTokens.vaultBTC,
// 		// 		}

// 		pigsBalance = {
// 			amount: balance,
// 			amountString: new BigNumber(balance).toFormat(0),
// 		}
// 		console.log(result)
// 	} catch (err) {
// 		console.log(err)
// 	}

// 	return pigsBalance
// }

export const getPigsBalance = async (account: string): Promise<Balance> => {
	const { pigsTokenContract } = getPigsContract()
	let pigsBalance: Balance

	try {
		const pigsBusdPrice = await getPigsBUSDPrice()
		const result: ethers.BigNumber = await pigsTokenContract.balanceOf(account)
		console.log(ethers.BigNumber.from(result).toString())
		const balance = ethers.BigNumber.from(result)
			.div(ethers.BigNumber.from((10 ** AnimalFarmTokens.pigsToken.decimals).toString()))
			.toNumber()
		const value = balance * pigsBusdPrice
		pigsBalance = {
			amount: balance,
			value,
			amountString: new BigNumber(balance).toFormat(0),
			valueString: new BigNumber(value).toFormat(2),
			token: AnimalFarmTokens.pigsToken,
		}
	} catch (error) {
		console.error('Error while fetching PIGS balance: ', error)
	}

	return pigsBalance
}

export const getBusdBalance = async (account: string) => {
	const { busdContract } = getPigsContract()

	let busdBalance
	try {
		const result: ethers.BigNumber = await busdContract.balanceOf(account)
		const balance = ethers.BigNumber.from(result).toString()
		busdBalance = {
			amount: balance,
			amountString: new BigNumber(balance).toFormat(0),
		}
		console.log(result)
	} catch (err) {
		console.log(err)
	}

	return busdBalance
}

export const getPigsBusdLpBalance = async (account: string) => {
	const { pigsBusdLpContract } = getPigsContract()

	let pigsBusdLpBalance
	try {
		const result: ethers.BigNumber = await pigsBusdLpContract.balanceOf(account)
		const balance = ethers.BigNumber.from(result).toString()

		pigsBusdLpBalance = {
			amount: balance,
			amountString: new BigNumber(balance).toFormat(0),
		}
		console.log(result)
	} catch (err) {
		console.log(err)
	}

	return pigsBusdLpBalance
}

export const availablePigsToClaim = async (account: string) => {
	const { pigsCreditContract } = getPigsContract()
	let availablePigs

	try {
		const result: ethers.BigNumber = await pigsCreditContract.availablePigsV2ToClaim(account)
		const balance = ethers.BigNumber.from(result).toString()
		availablePigs = {
			amount: balance,
			amountString: new BigNumber(balance).toFormat(0),
		}
		console.log(result)
	} catch (err) {
		console.log(err)
	}

	return availablePigs
}
