import { ethers } from 'ethers'
import { staticRpcProvider } from 'utils/providers'
import { AnimalFarmTokens, PigsCreditAddress } from '../config/constants'
import PigsAbi from '../config/abi/PigsTokenAbi.json'
import pigsCreditAbi from '../config/abi/pigsCreditAbi.json'
import pigggyBankAbi from '../config/abi/piggyBankAbi.json'
import busdAbi from '../config/abi/busdAbi.json'
import panCakeAbi from '../config/abi/panCake.json'

const getPigsContract = () => {
	const pigsTokenContract = new ethers.Contract(AnimalFarmTokens.pigsToken.address, PigsAbi, staticRpcProvider)
	const pigsCreditContract = new ethers.Contract(PigsCreditAddress, pigsCreditAbi, staticRpcProvider)
	const busdContract = new ethers.Contract('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', busdAbi, staticRpcProvider)
	const piggyBankContract = new ethers.Contract('0x19361161e8E3A67DE3818B3E5c932c43954C4918', pigggyBankAbi, staticRpcProvider)
	const pigsBusdLpContract = new ethers.Contract('0x7CF90484A25e6E5603170F4EFBcad23E73A7b1Ad', panCakeAbi, staticRpcProvider)

	return { pigsTokenContract, pigsCreditContract, busdContract, piggyBankContract, pigsBusdLpContract }
}

export default getPigsContract
