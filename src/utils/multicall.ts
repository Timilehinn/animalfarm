import { ethers } from 'ethers'
import { getMulticallContract } from 'utils/IgetContracts'
import { MultiCallResponse } from './types'

export interface Call {
	address: string // Address of the contract
	name: string // Function name on the contract (example: balanceOf)
	params?: any[] // Function params
}

interface MulticallOptions {
	requireSuccess?: boolean
}

const multicall = async <T = any>(abi: any[], calls: Call[]): Promise<T> => {
	// console.log("MULTICALL")
	// console.log("MULTICALL calls", calls)

	if (calls.length === 6) {
		// debugger
	}

	const callholder = calls
	try {
		const multi = getMulticallContract()
		const itf = new ethers.utils.Interface(abi)

		const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
		const { returnData } = await multi.aggregate(calldata)

		const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

		return res
	} catch (error) {
		console.error('Multicall error: ', error)
		console.error('Multicall error calls: ', callholder)
		throw new Error(error)
	}
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return inclues a boolean whether the call was successful e.g. [wasSuccessfull, callResult]
 */
export const multicallv2 = async <T = any>(abi: any[], calls: Call[], options: MulticallOptions = { requireSuccess: true }): Promise<MultiCallResponse<T>> => {
	const { requireSuccess } = options
	const multi = getMulticallContract()
	const itf = new ethers.utils.Interface(abi)

	const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
	const returnData = await multi.tryAggregate(requireSuccess, calldata)
	const res = returnData.map((call, i) => {
		const [result, data] = call
		return result ? itf.decodeFunctionResult(calls[i].name, data) : null
	})

	return res
}

export default multicall
