import { ethers } from 'ethers'
import { staticRpcProvider } from 'utils/providers'

import { VaultTokens } from 'config/constants/vaultTokenAddresses'
import VaultBtcABI from 'config/abi/VaultBTC.json'
import VaultS from 'config/abi/VaultS.json'

const getVaultContracts = () => {
	const vaultBtcContract = new ethers.Contract(VaultTokens.vaultBTC.address, VaultBtcABI, staticRpcProvider)
	const vaultSContract = new ethers.Contract(VaultTokens.vaultS.address, VaultS, staticRpcProvider)

	return { vaultBtcContract, vaultSContract }
}

export default getVaultContracts
