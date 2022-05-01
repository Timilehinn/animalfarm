import { ethers } from 'ethers'
import { staticRpcProvider } from 'utils/providers'
import { AnimalFarmTokens } from '../config/constants/animalFarmTokenAddresses'
import PigsAbi from '../config/abi/PigsTokenAbi.json'
import pigsCreditAbi from '../config/abi/pigsCreditAbi.json'
import busdAbi from '../config/abi/busdAbi.json'

const getPigsContract = () => {
	const pigsTokenContract = new ethers.Contract(AnimalFarmTokens.pigsToken.address, PigsAbi, staticRpcProvider)
	const pigsCreditContract = new ethers.Contract(AnimalFarmTokens.pigsCredit.address, pigsCreditAbi,staticRpcProvider)
	const busdContract = new ethers.Contract("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", busdAbi ,staticRpcProvider)

	return { pigsTokenContract,pigsCreditContract, busdContract }
}

export default getPigsContract