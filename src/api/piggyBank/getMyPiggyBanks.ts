import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import type { Balance } from 'state/balances'
import { AnimalFarmTokens } from 'config/constants'
import { getPigsBUSDPrice } from 'utils/getPrice'
import getPigsContract from '../../utils/getContracts'


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