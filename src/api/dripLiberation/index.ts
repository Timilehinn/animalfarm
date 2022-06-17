import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { Response } from 'state'
import erc20ABI from 'config/Iabi/erc20.json'

import multicall from 'utils/multicall'
import { LiquidityHelperPigsV2Address, BUSDAddress, AnimalFarmTokens, LARGE_NUMBER } from 'config/constants'
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
			// PIGS Allowance
			address: AnimalFarmTokens.pigsToken.address,
			name: 'allowance',
			params: [account, LiquidityHelperPigsV2Address],
		},
		{
			// BUSD Allowance
			address: BUSDAddress,
			name: 'allowance',
			params: [account, LiquidityHelperPigsV2Address],
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
		// User PIGS/BUSD LP Balance
		{
			address: AnimalFarmTokens.pigsToken.BUSD_LP,
			name: 'balanceOf',
			params: [account],
		},
	]

	const [pigsAllowance, busdAllowance, pigsBalance, busdBalance, pigsBusdLPBalance] = await multicall(erc20ABI, erc20Calls)

	return {
		pigsAllowance: new BigNumber(pigsAllowance).toJSON(),
		busdAllowance: new BigNumber(busdAllowance).toJSON(),
		pigsBalance: new BigNumber(pigsBalance).toJSON(),
		busdBalance: new BigNumber(busdBalance).toJSON(),
		pigsBusdLPBalance: new BigNumber(pigsBusdLPBalance).toJSON(),
	}
}

export const approveSpendPIGS = async (signer: ethers.Signer) => {
	const pigsTokenV2Contract = getPigsTokenV2Contract(signer)
	const tx = await pigsTokenV2Contract.approve(LiquidityHelperPigsV2Address, LARGE_NUMBER)
	await tx.wait()
}

export const addPIGSAndBUSDToLiquidity = async (pigsAmount: string, busdAmount: string, tolerance: string, signer: ethers.Signer): Promise<Response> => {
	let _tolerance
	if (!tolerance) {
		// Set default tolerance to 10%
		_tolerance = '10'
	} else {
		_tolerance = tolerance
	}

	const pigsAmountMin = new BigNumber(pigsAmount).multipliedBy(new BigNumber(100).minus(_tolerance).dividedBy(100))
	const busdAmountMin = new BigNumber(busdAmount).multipliedBy(new BigNumber(100).minus(_tolerance).dividedBy(100))

	try {
		const liquidityHelperContract = getLiquidityHelperContract(signer)
		const tx = await liquidityHelperContract['addPigsLiquidity(address,uint256,uint256,uint256,uint256)'](BUSDAddress, busdAmount, pigsAmount, amountFormatter(busdAmountMin.toString(), 0), amountFormatter(pigsAmountMin.toString(), 0))
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
