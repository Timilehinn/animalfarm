import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { Response } from 'state'

import { BUSDAddress, AnimalFarmTokens } from 'config/constants'
import { getPancakeRouterv2Contract } from 'utils/IgetContracts'
import { amountFormatter } from 'utils/formatBalance'

// TODO: Will be used widely in the app later on. This is still WIP
const getErrorMessage = (e): string => {
	const defaultErrorMessage = 'An error occured. Try again!'

	if (e.code === 4001) return 'User Rejected Transaction!'
	if (e.code === -32603) return e?.data?.message ? e.data.message : defaultErrorMessage
	return defaultErrorMessage
}

export const swapBUSDToPigs = async (amountA: string, amountB: string, tolerance: string, account: string, signer: ethers.Signer): Promise<Response> => {
	let _tolerance
	if (!tolerance) {
		// Set default tolerance to 10%
		_tolerance = '10'
	} else {
		_tolerance = tolerance
	}

	const amountBMin = new BigNumber(amountB).multipliedBy(new BigNumber(100).minus(_tolerance).dividedBy(100))

	const path = [BUSDAddress, AnimalFarmTokens.pigsToken.address]

	try {
		const pancakeRouterv2Contract = getPancakeRouterv2Contract(signer)
		const tx = await pancakeRouterv2Contract.swapExactTokensForTokens(amountA, amountFormatter(amountBMin.toString(), 0), path, account, Date.now() + 300)
		const receipt = await tx.wait()
		if (receipt.status === 1) {
			return {
				success: true,
				message: 'Swap Successful!',
			}
		}

		return {
			success: false,
			message: 'Swap Failed!',
		}
	} catch (e) {
		console.error('swap error: ', e)

		return {
			success: false,
			message: getErrorMessage(e),
		}
	}
}

export const swapPigsToBUSD = async (amountA: string, amountB: string, tolerance: string, account: string, signer: ethers.Signer): Promise<Response> => {
	let _tolerance
	if (!tolerance) {
		// Set default tolerance to 10%
		_tolerance = '10'
	} else {
		_tolerance = tolerance
	}

	const amountBMin = new BigNumber(amountB).multipliedBy(new BigNumber(100).minus(_tolerance).dividedBy(100))

	const path = [AnimalFarmTokens.pigsToken.address, BUSDAddress]

	try {
		const pancakeRouterv2Contract = getPancakeRouterv2Contract(signer)
		const tx = await pancakeRouterv2Contract.swapExactTokensForTokensSupportingFeeOnTransferTokens(amountA, amountFormatter(amountBMin.toString(), 0), path, account, Date.now() + 300)
		const receipt = await tx.wait()
		if (receipt.status === 1) {
			return {
				success: true,
				message: 'Swap Successful!',
			}
		}

		return {
			success: false,
			message: 'Swap Failed!',
		}
	} catch (e) {
		console.error('swap error: ', e)

		return {
			success: false,
			message: getErrorMessage(e),
		}
	}
}
