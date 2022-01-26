import { ethers } from 'ethers'
import { staticRpcProvider } from 'utils/providers'

import { Distributors } from 'config/constants/distributorAddresses'
import VaultXDistributorABI from 'config/abi/VaultXDistributor.json'
import VaultSDistributorABI from 'config/abi/VaultSDistributor.json'

const getDistributorContracts = () => {
	const vaultXDistributorContract = new ethers.Contract(Distributors.vaultX.address, VaultXDistributorABI, staticRpcProvider)
	const vaultSDistributorContract = new ethers.Contract(Distributors.vaultS.address, VaultSDistributorABI, staticRpcProvider)

	return { vaultXDistributorContract, vaultSDistributorContract }
}

export default getDistributorContracts
