import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { Response } from 'state'
import erc20ABI from 'config/Iabi/erc20.json'

import multicall from 'utils/multicall'
import { DripLiberationAddress, DripBusdLpTokenAddress, BUSDAddress, LARGE_NUMBER } from 'config/constants'
import { getPigsTokenV2Contract, getLiquidityHelperContract } from 'utils/IgetContracts'
import { amountFormatter } from 'utils/formatBalance'

// TODO: Will be used widely in the app later on. This is still WIP
const getErrorMessage = (e): string => {
	const defaultErrorMessage = 'An error occured. Try again!'

	if (e.code === 4001) return 'User Rejected Transaction!'
	if (e.code === -32603) return e?.data?.message ? e.data.message : defaultErrorMessage
	return defaultErrorMessage
}

export const fetchDataForDripLiberation = async (account: string): Promise<any> => {
	const erc20Calls = [
		{
			// BUSD Allowance
			address: BUSDAddress,
			name: 'allowance',
			params: [account, DripLiberationAddress],
		},
		{
			// User BUSD balance
			address: BUSDAddress,
			name: 'balanceOf',
			params: [account],
		},
		// User PIGS/BUSD LP Balance
		{
			address: DripBusdLpTokenAddress,
			name: 'balanceOf',
			params: [account],
		},
	]

	const [busdAllowance, busdBalance, dripBusdLPBalance] = await multicall(erc20ABI, erc20Calls)

	return {
		busdAllowance: new BigNumber(busdAllowance).toJSON(),
		busdBalance: new BigNumber(busdBalance).toJSON(),
		dripBusdLPBalance: new BigNumber(dripBusdLPBalance).toJSON(),
	}
}

export const addBUSDToLiberation = async (busdAmount: string, signer: ethers.Signer): Promise<Response> => {
	try {
		const liquidityHelperContract = getLiquidityHelperContract(signer)
		const tx = await liquidityHelperContract['addPigsLiquidity(address,uint256,uint256,uint256,uint256)'](busdAmount)
		await tx.wait()

		return {
			success: true,
			message: 'Add Liquidity Successful!',
		}
	} catch (e) {
		console.error('addPIGSAndBUSDToLiquidity error: ', e)

		return {
			success: false,
			message: getErrorMessage(e),
		}
	}
}
