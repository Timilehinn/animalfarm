import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { Response as ApiResponse } from 'state'
import erc20ABI from 'config/Iabi/erc20.json'

import multicall from 'utils/multicall'
import { PancakeSwapRouterv2Address, BUSDAddress, AnimalFarmTokens, LARGE_NUMBER } from 'config/constants'
import { getPigsTokenV2Contract } from 'utils/IgetContracts'
import { swapBUSDToPigs, swapPigsToBUSD } from './helper'

export const fetchDataForSwap = async (account: string): Promise<any> => {
	const erc20Calls = [
		{
			// PIGS Allowance
			address: AnimalFarmTokens.pigsToken.address,
			name: 'allowance',
			params: [account, PancakeSwapRouterv2Address],
		},
		{
			// BUSD Allowance
			address: BUSDAddress,
			name: 'allowance',
			params: [account, PancakeSwapRouterv2Address],
		},
		{
			// User PIGS balance
			address: AnimalFarmTokens.pigsToken.address,
			name: 'balanceOf',
			params: [account],
		},
		{
			// User BUSD balance
			address: BUSDAddress,
			name: 'balanceOf',
			params: [account],
		},
	]

	const [pigsAllowance, busdAllowance, pigsBalance, busdBalance] = await multicall(erc20ABI, erc20Calls)

	return {
		allowance: {
			PIGS: new BigNumber(pigsAllowance).toJSON(),
			BUSD: new BigNumber(busdAllowance).toJSON(),
		},
		balance: {
			PIGS: new BigNumber(pigsBalance).toJSON(),
			BUSD: new BigNumber(busdBalance).toJSON(),
		},
	}
}

export const approveSpendPIGS = async (signer: ethers.Signer) => {
	const pigsTokenV2Contract = getPigsTokenV2Contract(signer)
	const tx = await pigsTokenV2Contract.approve(PancakeSwapRouterv2Address, LARGE_NUMBER)
	await tx.wait()
}

export const swapCallback = async (tokenA: string, tokenB: string, amountA: string, amountB: string, tolerance: string, account: string, signer: ethers.Signer): Promise<ApiResponse> => {
	const demoRes: ApiResponse = {
		message: '',
		success: false,
	}

	if (!tokenA && !tokenB) {
		return {
			success: false,
			message: 'Invalid Params!',
		}
	}

	// Handle Swap from BUSD to PIGS
	if (tokenA === 'BUSD' && tokenB === 'PIGS') {
		const res = await swapBUSDToPigs(amountA, amountB, tolerance, account, signer)
		return res
	}

	// Handle Swap from PIGS to BUSD
	if (tokenA === 'PIGS' && tokenB === 'BUSD') {
		const res = await swapPigsToBUSD(amountA, amountB, tolerance, account, signer)
		return res
	}

	return demoRes
}
