import Web3 from 'web3'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

import { web3Provider } from 'utils/providers'

import getSurgeContracts from 'utils/getSurgeContracts'
import { pancakeswapRouterAddress, WBNBAddress, BUSDAddress, BEP_ETH, VaultTokens } from 'config/constants/'
import IUniswapV2Router02 from 'config/abi/IUniswapV2Router02.json'

const IUniswapV2RouterABI: any = IUniswapV2Router02
const web3 = new Web3(web3Provider)

const web3PancakeRouterContract = new web3.eth.Contract(IUniswapV2RouterABI, pancakeswapRouterAddress)

export const getBNBPrice: any = () => {
	return new Promise((resolve) => {
		const path = [WBNBAddress, BUSDAddress]
		web3PancakeRouterContract.methods
			.getAmountsOut(web3.utils.toBN(1 * 10 ** 18), path)
			.call()
			.then((data) => {
				resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18)))
			})
	})
}

export const getETHPrice: any = () => {
	return new Promise((resolve) => {
		const path = [BEP_ETH, BUSDAddress]
		web3PancakeRouterContract.methods
			.getAmountsOut(web3.utils.toBN(1 * 10 ** 18), path)
			.call()
			.then((data) => {
				resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18)))
			})
	})
}

const getVaultXBnbPrice: any = () => {
	return new Promise((resolve) => {
		const path = [VaultTokens.vaultBTC.address, WBNBAddress]
		web3PancakeRouterContract.methods
			.getAmountsOut(web3.utils.toBN(1 * 10 ** 9), path)
			.call()
			.then((data) => {
				resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18)))
			})
	})
}

export const getVaultXPrice = async (): Promise<number> => {
	const bnbPrice = await getBNBPrice()
	const vaultXBnbPrice = await getVaultXBnbPrice()
	const vaultXPrice = vaultXBnbPrice * bnbPrice
	return vaultXPrice
}

const getVaultSBnbPrice: any = () => {
	return new Promise((resolve) => {
		const path = [VaultTokens.vaultS.address, WBNBAddress]
		web3PancakeRouterContract.methods
			.getAmountsOut(web3.utils.toBN(1 * 10 ** 9), path)
			.call()
			.then((data) => {
				resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18)))
			})
	})
}

export const getVaultSPrice = async (): Promise<number> => {
	const bnbPrice = await getBNBPrice()
	const vaultSBnbPrice = await getVaultSBnbPrice()
	const vaultSPrice = vaultSBnbPrice * bnbPrice
	return vaultSPrice
}

export const getXUSDPrice = async (): Promise<number> => {
	const { surgeXUSDContract } = getSurgeContracts()
	let xUSDPrice: number

	try {
		const calculatedPrice: ethers.BigNumber = await surgeXUSDContract.calculatePrice()
		xUSDPrice = new BigNumber(ethers.BigNumber.from(calculatedPrice).toString()).toNumber() / 10 ** 18
	} catch (error) {
		console.error('Error while fetching SurgeXUSD price: ', error)
	}

	return xUSDPrice
}
