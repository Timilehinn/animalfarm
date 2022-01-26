import { ethers } from 'ethers'
import { staticRpcProvider } from 'utils/providers'

import { SurgeTokens } from 'config/constants/surgeTokenAddresses'
import SurgeBTC from 'config/abi/SurgeBTC.json'
import SurgeETH from 'config/abi/SurgeETH.json'
import SurgeXUSD from 'config/abi/SurgeXUSD.json'
import SurgeADA from 'config/abi/SurgeADA.json'
import SurgeUseless from 'config/abi/SurgeUseless.json'
import SurgeUSD from 'config/abi/SurgeUSD.json'

const getSurgeContracts = () => {
	const surgeBtcContract = new ethers.Contract(SurgeTokens.surgeBTC.address, SurgeBTC, staticRpcProvider)
	const surgeEthContract = new ethers.Contract(SurgeTokens.surgeETH.address, SurgeETH, staticRpcProvider)
	const surgeXUSDContract = new ethers.Contract(SurgeTokens.surgeXUSD.address, SurgeXUSD, staticRpcProvider)
	const surgeADAContract = new ethers.Contract(SurgeTokens.surgeADA.address, SurgeADA, staticRpcProvider)
	const surgeUselessContract = new ethers.Contract(SurgeTokens.surgeUseless.address, SurgeUseless, staticRpcProvider)
	const surgeUSDContract = new ethers.Contract(SurgeTokens.surgeUSD.address, SurgeUSD, staticRpcProvider)

	return { surgeBtcContract, surgeEthContract, surgeXUSDContract, surgeADAContract, surgeUselessContract, surgeUSDContract }
}

export default getSurgeContracts
