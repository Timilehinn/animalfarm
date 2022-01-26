import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

import type { Balance } from 'state/wallet'
import getDistributorContracts from 'utils/getDistributorContracts'
import { getBNBPrice, getXUSDPrice } from 'utils/getPrice'
import { Distributors } from 'config/constants/distributorAddresses'

export const getVaultXReward = async (account: string): Promise<Balance> => {
	const { vaultXDistributorContract } = getDistributorContracts()
	let unPaidEarning: Balance

	try {
		const bnbPrice = await getBNBPrice()
		const XUSDPrice = await getXUSDPrice()
		const XUSDBnbPrice = XUSDPrice / bnbPrice

		const result: ethers.BigNumber = await vaultXDistributorContract.getUnpaidMainEarnings(account)
		const amountUnpaidBnb = new BigNumber(ethers.BigNumber.from(result).toString()).toNumber() / 10 ** 18
		const amount = amountUnpaidBnb / XUSDBnbPrice
		const value = amount * XUSDPrice

		unPaidEarning = {
			amount,
			value,
			amountString: new BigNumber(amount).toFormat(2),
			valueString: new BigNumber(value).toFormat(2),
			token: Distributors.vaultX.token,
		}
	} catch (error) {
		console.error('Error while fetching Vault-X Reward balance: ', error)
	}

	return unPaidEarning
}

export const getVaultSReward = async (account: string): Promise<Balance> => {
	const { vaultSDistributorContract } = getDistributorContracts()
	let unPaidEarning: Balance

	try {
		const bnbPrice = await getBNBPrice()
		const result: ethers.BigNumber = await vaultSDistributorContract.getUnpaidMainEarnings(account)
		const amount = new BigNumber(ethers.BigNumber.from(result).toString()).toNumber() / 10 ** 18
		const value = new BigNumber(amount).times(bnbPrice).toNumber()

		unPaidEarning = {
			amount,
			value,
			amountString: new BigNumber(amount).toFormat(5),
			valueString: new BigNumber(value).toFormat(2),
			token: Distributors.vaultS.token,
		}
	} catch (error) {
		console.error('Error while fetching Vault-S Reward balance: ', error)
	}

	return unPaidEarning
}
