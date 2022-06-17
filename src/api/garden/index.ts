import { ethers } from 'ethers'
import { DripGardenAddress, DripBusdLpTokenAddress, LARGE_NUMBER } from 'config/constants'
import { getBep20Contract, getDripGardenContract } from 'utils/IgetContracts'

export const approveDripGardenForDripBusdLP = async (signer: ethers.Signer) => {
	const bep20Contract = getBep20Contract(DripBusdLpTokenAddress, signer)
	const tx = await bep20Contract.approve(DripGardenAddress, LARGE_NUMBER)
	await tx.wait()
}
