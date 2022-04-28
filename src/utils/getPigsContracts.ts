import { ethers } from 'ethers'
import { staticRpcProvider } from 'utils/providers'
import { AnimalFarmTokens } from '../config/constants/animalFarmTokenAddresses'
import PigsAbi from '../config/abi/PigsTokenAbi.json'

const getPigsContract = () => {
	const pigsContract = new ethers.Contract(AnimalFarmTokens.pigsToken.address, PigsAbi, staticRpcProvider)

	return { pigsContract }
}

export default getPigsContract