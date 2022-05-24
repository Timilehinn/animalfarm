import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import type { Balance } from 'state/balances'
import { AnimalFarmTokens } from 'config/constants'
import { getPigsBUSDPrice } from 'utils/getPrice'
import getPigsContract from 'utils/getContracts'
import { Response } from 'state'

export const getMyPiggyBanks = async (account: string) => {
	const { piggyBankContract } = getPigsContract()
	let piggyBanks

	try {
		const result: ethers.BigNumber = await piggyBankContract.getMyPiggyBanks(account)
		// const balance = ethers.BigNumber.from(result).toJSON()
		// piggyBanks = {
		// 	amount: balance,
		// 	amountString: new BigNumber(balance).toFormat(0),
		// }
		console.log(result)
	} catch (err) {
		console.log(err)
	}

	return piggyBanks
}

export const buyPigLets = async (amount: string, lockForNumberOfWeeks: string, referee: string, signer: ethers.Signer) => {
	const { piggyBankContract } = getPigsContract()

	let res
	// const referee = localStorage.getItem("ref") || "0x0000000000000000000000000000000000000000"

	try {
		const result: ethers.BigNumber = await piggyBankContract.connect(signer).buyTruffles(amount, lockForNumberOfWeeks, referee, { gasLimit: 2500000 })
		// const balance = ethers.BigNumber.from(result).toJSON()
		// piggyBanks = {
		// 	amount: balance,
		// 	amountString: new BigNumber(balance).toFormat(0),
		// }
		res = {
			success: true,
		}
	} catch (err) {
		res = {
			success: false,
		}

		console.log(err)
	}

	return res
}

export const giftPiglet = async (giftRecipient: string, amount: string, lockForNumberOfWeeks: string, signer: ethers.Signer) => {
	const { piggyBankContract } = getPigsContract()

	let res
	// const referee = localStorage.getItem("ref") || "0x0000000000000000000000000000000000000000"

	try {
		const result: ethers.BigNumber = await piggyBankContract.connect(signer).giftTruffles(giftRecipient, amount, lockForNumberOfWeeks, { gasLimit: 2500000 })
		// const balance = ethers.BigNumber.from(result).toJSON()
		// piggyBanks = {
		// 	amount: balance,
		// 	amountString: new BigNumber(balance).toFormat(0),
		// }
		res = {
			success: true,
		}
	} catch (err) {
		res = {
			success: false,
		}

		console.log(err)
	}

	return res
}

export const sellPiglets = async (id: string, signer: ethers.Signer) => {
	const { piggyBankContract } = getPigsContract()

	let res
	// const referee = localStorage.getItem("ref") || "0x0000000000000000000000000000000000000000"

	try {
		const result: ethers.BigNumber = await piggyBankContract.connect(signer).sellTruffles(id, { gasLimit: 2500000 })
		// const balance = ethers.BigNumber.from(result).toJSON()
		// piggyBanks = {
		// 	amount: balance,
		// 	amountString: new BigNumber(balance).toFormat(0),
		// }
		res = {
			success: true,
		}
	} catch (err) {
		res = {
			success: false,
		}

		console.log(err)
	}

	return res
}

export const compound = async (id: string, signer: ethers.Signer) => {
	const { piggyBankContract } = getPigsContract()

	let res
	// const referee = localStorage.getItem("ref") || "0x0000000000000000000000000000000000000000"

	try {
		// await piggyBankContract.connect(signer).feedPiglets(id, { gasLimit: 300000 })
		await piggyBankContract.connect(signer).feedPiglets(id)
		// const balance = ethers.BigNumber.from(result).toJSON()
		// piggyBanks = {
		// 	amount: balance,
		// 	amountString: new BigNumber(balance).toFormat(0),
		// }
		res = {
			success: true,
		}
	} catch (err) {
		res = {
			success: false,
		}

		console.log(err)
	}

	return res
}

export const claimToPigsPen = async (amount: string, signer: ethers.Signer) => {
	const { pigsPenContract } = getPigsContract()

	let res
	// const referee = localStorage.getItem("ref") || "0x0000000000000000000000000000000000000000"

	try {
		const result: ethers.BigNumber = await pigsPenContract.connect(signer).claimPigsV2ToPigPen(amount, { gasLimit: 2500000 })
		// const balance = ethers.BigNumber.from(result).toJSON()
		// piggyBanks = {
		// 	amount: balance,
		// 	amountString: new BigNumber(balance).toFormat(0),
		// }
		res = {
			success: true,
		}
	} catch (err) {
		res = {
			success: false,
		}
		console.error(err)
	}

	return res
}

export const compoundAllStakes = async (id: string, signer: ethers.Signer): Promise<Response> => {
	const { piggyBankContract } = getPigsContract()
	try {
		const _compound = await piggyBankContract.connect(signer).feedPiglets(id)
		await _compound.wait()

		return {
			success: true,
			message: 'Transaction Successful!',
		}
	} catch (err) {
		return {
			success: false,
			message: 'Transaction Failed!',
		}
	}
}
