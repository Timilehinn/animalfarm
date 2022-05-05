import { ethers } from 'ethers'
import { staticRpcProvider } from 'utils/providers'
import { AnimalFarmTokens, PigsV2BusdLP, PigsCreditAddress, PIGSAddress, BUSDAddress, PiggyBankAddress, PigPenAddress } from '../config/constants'
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
	const pigsBusdLpContract = new ethers.Contract(PigsV2BusdLP, panCakeAbi, staticRpcProvider)
	const pigsPenContract = new ethers.Contract(PigPenAddress, pigPenAbi, staticRpcProvider)

	return { pigsTokenContract, pigsCreditContract, busdContract, pigsPenContract, piggyBankContract, pigsBusdLpContract }
}

export default getPigsContract
