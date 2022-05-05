import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'

// ABIs
import bep20Abi from 'config/Iabi/erc20.json'
import lpTokenAbi from 'config/Iabi/lpToken.json'
import MultiCallAbi from 'config/Iabi/Multicall.json'
import PigsTokenAbi from 'config/abi/PigsTokenAbi.json'
import piggyBankABI from 'config/Iabi/PiggyBank.json'
import PigCreditsABI from 'config/Iabi/PigCredits.json'
import PigPenV2ABI from 'config/abi/PigPenV2.json'

// Addresses
import { PIGSAddress, PigsCreditAddress, PigPenAddress, PiggyBankAddress, MultiCallAddress } from '../config/constants'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
	const signerOrProvider = signer ?? simpleRpcProvider
	return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
	return getContract(bep20Abi, address, signer)
}
export const getLpContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
	return getContract(lpTokenAbi, address, signer)
}

export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
	return getContract(MultiCallAbi, MultiCallAddress, signer)
}

export const getPigsTokenV2Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
	return getContract(PigsTokenAbi, PIGSAddress, signer)
}

export const getPiggyBankContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
	return getContract(piggyBankABI, PiggyBankAddress, signer)
}

export const getPigCreditContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
	return getContract(PigCreditsABI, PigsCreditAddress, signer)
}

export const getPigPenContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
	return getContract(PigPenV2ABI, PigPenAddress, signer)
}
