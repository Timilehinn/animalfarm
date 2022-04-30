import { ethers } from 'ethers'
import { staticRpcProvider } from 'utils/providers'
import { AnimalFarmTokens } from '../config/constants/animalFarmTokenAddresses'
import PigsAbi from '../config/abi/PigsTokenAbi.json'
import pigsCreditAbi from '../config/abi/pigsCreditAbi.json'

const getPigsContract = () => {
	const pigsTokenContract = new ethers.Contract(AnimalFarmTokens.pigsToken.address, PigsAbi, staticRpcProvider)
	const pigsCreditContract = new ethers.Contract(AnimalFarmTokens.pigsCredit.address, pigsCreditAbi,staticRpcProvider)

	return { pigsTokenContract,pigsCreditContract }
}

export default getPigsContract