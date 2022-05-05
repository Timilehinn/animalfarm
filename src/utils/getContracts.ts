import { ethers } from 'ethers'
import { staticRpcProvider } from 'utils/providers'
import { AnimalFarmTokens, PigsCreditAddress,PIGSAddress,BUSDAddress, PiggyBankAddress, PigPenAddress } from '../config/constants'
import PigsAbi from '../config/abi/PigsTokenAbi.json'
import pigsCreditAbi from '../config/abi/pigsCreditAbi.json'
import pigggyBankAbi from '../config/abi/piggyBankAbi.json'
import busdAbi from '../config/abi/busdAbi.json'
import panCakeAbi from '../config/abi/panCake.json'
import pigPenAbi from '../config/abi/pigPenAbi.json'

const getPigsContract = () => {
	const pigsTokenContract = new ethers.Contract(PIGSAddress, PigsAbi, staticRpcProvider)
	const pigsCreditContract = new ethers.Contract(PigsCreditAddress, pigsCreditAbi, staticRpcProvider)
	const busdContract = new ethers.Contract(BUSDAddress, busdAbi, staticRpcProvider)
	const piggyBankContract = new ethers.Contract(PiggyBankAddress, pigggyBankAbi, staticRpcProvider)
	const pigsBusdLpContract = new ethers.Contract('0x7CF90484A25e6E5603170F4EFBcad23E73A7b1Ad', panCakeAbi, staticRpcProvider)
	const pigsPenContract = new ethers.Contract(PigPenAddress, pigPenAbi, staticRpcProvider)

	return { pigsTokenContract, pigsCreditContract, busdContract, pigsPenContract, piggyBankContract, pigsBusdLpContract }
}

export default getPigsContract
