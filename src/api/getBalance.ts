import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

import type { Balance } from 'state/wallet'
import getVaultContracts from 'utils/getVaultContracts'
import getSurgeContracts from 'utils/getSurgeContracts'
import { staticRpcProvider } from 'utils/providers'
import { getVaultXPrice, getVaultSPrice, getBNBPrice, getETHPrice } from 'utils/getPrice'
import { WBNB_TOKEN } from 'config/constants'
import { VaultTokens } from 'config/constants/vaultTokenAddresses'
import { SurgeTokens } from 'config/constants/surgeTokenAddresses'

const getBnbBalance = async (account: string): Promise<Balance> => {
	const bnbPrice = await getBNBPrice()

	// eslint-disable-next-line no-param-reassign
	// account = '0xd93ACb4da599220d260020EB3CCCF4850FC26035' // TODO: remove this assignment

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

const getVaultBtcBalance = async (account: string): Promise<Balance> => {
	const { vaultBtcContract } = getVaultContracts()
	let vaultBtcBalance: Balance

	// eslint-disable-next-line no-param-reassign
	// account = '0xd93ACb4da599220d260020EB3CCCF4850FC26035' // TODO: remove this assignment

	try {
		const vaultXPrice = await getVaultXPrice()
		const result: ethers.BigNumber = await vaultBtcContract.balanceOf(account)
		const balance = ethers.BigNumber.from(result)
			.div(ethers.BigNumber.from(10 ** VaultTokens.vaultBTC.decimals))
			.toNumber()
		const value = balance * vaultXPrice
		vaultBtcBalance = {
			amount: balance,
			value,
			amountString: new BigNumber(balance).toFormat(0),
			valueString: new BigNumber(value).toFormat(2),
			token: VaultTokens.vaultBTC,
		}
	} catch (error) {
		console.error('Error while fetching VaultBTC balance: ', error)
	}

	return vaultBtcBalance
}

const getVaultSBalance = async (account: string): Promise<Balance> => {
	const { vaultSContract } = getVaultContracts()
	let vaultSBalance: Balance

	// eslint-disable-next-line no-param-reassign
	// account = '0xd93ACb4da599220d260020EB3CCCF4850FC26035' // TODO: remove this assignment

	try {
		const vaultSPrice = await getVaultSPrice()
		const result: ethers.BigNumber = await vaultSContract.balanceOf(account)
		const balance = ethers.BigNumber.from(result)
			.div(ethers.BigNumber.from(10 ** VaultTokens.vaultS.decimals))
			.toNumber()
		const value = balance * vaultSPrice
		vaultSBalance = {
			amount: balance,
			value,
			amountString: new BigNumber(balance).toFormat(0),
			valueString: new BigNumber(value).toFormat(2),
			token: VaultTokens.vaultS,
		}
	} catch (error) {
		console.error('Error while fetching Vault-S balance: ', error)
	}

	return vaultSBalance
}

const getSurgeBtcBalance = async (account: string): Promise<Balance> => {
	const { surgeBtcContract } = getSurgeContracts()
	let surgeBtcBalance: Balance

	// eslint-disable-next-line no-param-reassign
	// account = '0xdFdDd217264dA2da25cD1e992223401606235Ef6' // TODO: remove this assignment

	try {
		const resultBalance: ethers.BigNumber = await surgeBtcContract.balanceOf(account)
		const balance = new BigNumber(ethers.BigNumber.from(resultBalance).toString()).toNumber()
		const resultHoldings: ethers.BigNumber = await surgeBtcContract.getValueOfHoldingsInUSD(account)
		const valueOfHoldings = new BigNumber(ethers.BigNumber.from(resultHoldings).toString()).toNumber() / 10 ** 18
		surgeBtcBalance = {
			amount: balance,
			value: valueOfHoldings,
			amountString: new BigNumber(balance).toFormat(0),
			valueString: new BigNumber(valueOfHoldings).toFormat(2),
			token: SurgeTokens.surgeBTC,
		}
	} catch (error) {
		console.error('Error while fetching SurgeBTC balance: ', error)
	}

	return surgeBtcBalance
}

const getSurgeEthBalance = async (account: string): Promise<Balance> => {
	const { surgeEthContract } = getSurgeContracts()
	let surgeEthBalance: Balance

	// eslint-disable-next-line no-param-reassign
	// account = '0x8a91f529d7606eaefba39054910ea2320201f6d1' // TODO: remove this assignment

	try {
		const ethPrice: number = await getETHPrice()
		const resultBalance: ethers.BigNumber = await surgeEthContract.balanceOf(account)
		const balance = new BigNumber(ethers.BigNumber.from(resultBalance).toString()).toNumber()
		const resultHoldings: ethers.BigNumber = await surgeEthContract.getValueOfHoldings(account)
		const valueOfHoldings = (new BigNumber(ethers.BigNumber.from(resultHoldings).toString()).toNumber() * ethPrice) / 10 ** 18
		surgeEthBalance = {
			amount: balance,
			value: valueOfHoldings,
			amountString: new BigNumber(balance).toFormat(0),
			valueString: new BigNumber(valueOfHoldings).toFormat(2),
			token: SurgeTokens.surgeETH,
		}
	} catch (error) {
		console.error('Error while fetching SurgeETH balance: ', error)
	}

	return surgeEthBalance
}

const getSurgeXUsdBalance = async (account: string): Promise<Balance> => {
	const { surgeXUSDContract } = getSurgeContracts()
	let surgeXUsdBalance: Balance

	// eslint-disable-next-line no-param-reassign
	// account = '0xd93ACb4da599220d260020EB3CCCF4850FC26035' // TODO: remove this assignment

	try {
		const resultBalance: ethers.BigNumber = await surgeXUSDContract.balanceOf(account)
		const balance = new BigNumber(ethers.BigNumber.from(resultBalance).toString()).toNumber() / 10 ** 18
		const resultHoldings: ethers.BigNumber = await surgeXUSDContract.getValueOfHoldings(account)
		const valueOfHoldings = new BigNumber(ethers.BigNumber.from(resultHoldings).toString()).toNumber() / 10 ** 18
		surgeXUsdBalance = {
			amount: balance,
			value: valueOfHoldings,
			amountString: new BigNumber(balance).toFormat(0),
			valueString: new BigNumber(valueOfHoldings).toFormat(2),
			token: SurgeTokens.surgeXUSD,
		}
	} catch (error) {
		console.error('Error while fetching SurgeXUSD balance: ', error)
	}

	return surgeXUsdBalance
}

export const getAllVaultXBalance = async (account: string): Promise<Balance[]> => {
	return Promise.all([getVaultBtcBalance(account), getSurgeXUsdBalance(account)]).then((tokenBalances) => {
		return tokenBalances
	})
}

export const getAllVaultSBalance = async (account: string): Promise<Balance[]> => {
	return Promise.all([getVaultSBalance(account), getBnbBalance(account)]).then((tokenBalances) => {
		return tokenBalances
	})
}

export const getAllBalance = async (account: string): Promise<Balance[]> => {
	return Promise.all([getVaultBtcBalance(account), getVaultSBalance(account), getSurgeXUsdBalance(account), getSurgeBtcBalance(account), getSurgeEthBalance(account)]).then((allBalance) => {
		return allBalance
	})
}
