import { ethers } from 'ethers'
import { Response } from 'state'
import { DripGardenAddress, DripBusdLpTokenAddress, LARGE_NUMBER } from 'config/constants'
import { getBep20Contract, getDripGardenContract } from 'utils/IgetContracts'
import { DEFAULT_GAS_LIMIT } from 'config'
import { getErrorMessage } from 'utils/getErrorMessage'

const options = {
	gasLimit: DEFAULT_GAS_LIMIT,
}

export const approveDripGardenForDripBusdLP = async (signer: ethers.Signer) => {
	const bep20Contract = getBep20Contract(DripBusdLpTokenAddress, signer)
	const tx = await bep20Contract.approve(DripGardenAddress, LARGE_NUMBER)
	await tx.wait()
}

export const buySeeds = async (ref, amount, signer: ethers.Signer): Promise<Response> => {
	try {
		const dripGardenContract = getDripGardenContract(signer)

		const tx = await dripGardenContract.buySeeds(ref, amount, options)
		const receipt = await tx.wait()
		if (receipt.status === 1) {
			return {
				success: true,
				message: 'Buy Plants Successful!',
			}
		}

		return {
			success: false,
			message: 'Buy Plants Failed!',
		}
	} catch (e) {
		console.error('buySeeds error: ', e)

		return {
			success: false,
			message: getErrorMessage(e),
		}
	}
}

export const plantSeeds = async (ref, signer: ethers.Signer): Promise<Response> => {
	try {
		const dripGardenContract = getDripGardenContract(signer)

		const tx = await dripGardenContract.plantSeeds(ref)
		const receipt = await tx.wait()
		if (receipt.status === 1) {
			return {
				success: true,
				message: 'Plant Seeds Successful!',
			}
		}

		return {
			success: false,
			message: 'Plant Seeds Failed!',
		}
	} catch (e) {
		console.error('plantSeeds error: ', e)

		return {
			success: false,
			message: getErrorMessage(e),
		}
	}
}

export const sellSeeds = async (signer: ethers.Signer): Promise<Response> => {
	try {
		const dripGardenContract = getDripGardenContract(signer)

		const tx = await dripGardenContract.sellSeeds(options)
		const receipt = await tx.wait()
		if (receipt.status === 1) {
			return {
				success: true,
				message: 'Sell Seeds Successful!',
			}
		}

		return {
			success: false,
			message: 'Sell Seeds Failed!',
		}
	} catch (e) {
		console.error('sellSeeds error: ', e)

		return {
			success: false,
			message: getErrorMessage(e),
		}
	}
}

export const getEstimatedPlants = async (amount: string, signer: ethers.Signer): Promise<string> => {
	let amountPlantsTaxed = '0'
	try {
		const dripGardenContract = getDripGardenContract(signer)

		const result: ethers.BigNumber = await dripGardenContract.calculateSeedsBuySimpleTotal(amount, options)
		const seeds = ethers.BigNumber.from(result).toString()

		if (seeds) {
			amountPlantsTaxed = String((Number(seeds) * 0.95) / 2592e3)
		}
	} catch (e) {
		console.error('getEstimatedPlants error: ', e)
	}

	return amountPlantsTaxed
}
