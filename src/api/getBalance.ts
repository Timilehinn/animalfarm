import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

import type { Balance } from 'state/balances'

import { staticRpcProvider } from 'utils/providers'
import { getBNBPrice, getETHPrice } from 'utils/getPrice'
import { WBNB_TOKEN } from 'config/constants'

const getBnbBalance = async (account: string): Promise<Balance> => {
	const bnbPrice = await getBNBPrice()

	const result = await staticRpcProvider.getBalance(account)
	const balanceInEth = ethers.utils.formatEther(result)

	const balance = new BigNumber(balanceInEth).toNumber()
	const value = balance * bnbPrice

	const bnbBalance: Balance = {
		amount: balance,
		value,
		amountString: new BigNumber(balance).toFormat(5),
		valueString: new BigNumber(value).toFormat(2),
		token: WBNB_TOKEN,
	}
	return bnbBalance
}

// const getVaultBtcBalance = async (account: string): Promise<Balance> => {
// 	const { vaultBtcContract } = getVaultContracts()
// 	let vaultBtcBalance: Balance

// 	try {
// 		const vaultXPrice = await getVaultXPrice()
// 		const result: ethers.BigNumber = await vaultBtcContract.balanceOf(account)
// 		const balance = ethers.BigNumber.from(result)
// 			.div(ethers.BigNumber.from(10 ** VaultTokens.vaultBTC.decimals))
// 			.toNumber()
// 		const value = balance * vaultXPrice
// 		vaultBtcBalance = {
// 			amount: balance,
// 			value,
// 			amountString: new BigNumber(balance).toFormat(0),
// 			valueString: new BigNumber(value).toFormat(2),
// 			token: VaultTokens.vaultBTC,
// 		}
// 	} catch (error) {
// 		console.error('Error while fetching VaultBTC balance: ', error)
// 	}

// 	return vaultBtcBalance
// }

// export const getAllVaultXBalance = async (account: string): Promise<Balance[]> => {
// 	return Promise.all([getVaultBtcBalance(account)]).then((tokenBalances) => {
// 		return tokenBalances
// 	})
// }

// export const getAllBalance = async (account: string): Promise<Balance[]> => {
// 	return Promise.all([getVaultBtcBalance(account)]).then((allBalance) => {
// 		return allBalance
// 	})
// }
