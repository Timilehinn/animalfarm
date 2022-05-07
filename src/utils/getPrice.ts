import Web3 from 'web3'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

import { web3Provider } from 'utils/providers'

import { pancakeswapRouterAddress, WBNBAddress, BUSDAddress, BEP_ETH, AnimalFarmTokens } from 'config/constants/'
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

export const getPigsBUSDPrice: any = () => {
	return new Promise((resolve) => {
		const path = [AnimalFarmTokens.pigsToken.address, BUSDAddress]
		web3PancakeRouterContract.methods
			.getAmountsOut(web3.utils.toBN(1 * 10 ** 18), path)
			.call()
			.then((data) => {
				resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18)))
			})
	})
}
