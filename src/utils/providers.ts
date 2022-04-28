// eslint-disable-next-line react-hooks/exhaustive-deps
import Web3 from 'web3'
import { ethers } from 'ethers'
import getRpcUrl from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl()

console.log(RPC_URL)

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)
export const staticRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)
export const web3Provider = new Web3.providers.HttpProvider(RPC_URL)

export default staticRpcProvider
