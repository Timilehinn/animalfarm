import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import erc20ABI from 'config/Iabi/erc20.json'
import pigsCreditAbi from 'config/abi/pigsCreditAbi.json'
import multicall from 'utils/multicall'
import { PIGSAddress, LARGE_NUMBER, BUSDAddress, PigsCreditAddress } from 'config/constants'
import { getPigCreditContract, getBep20Contract } from 'utils/IgetContracts'

// import { PigPenUserData, PigPen, PigPenState } from 'state/pigpen'

export const fetchPigsCreditData = async (account: string): Promise<any> => {
	const erc20Calls = [
		{
			// Allowance
			address: BUSDAddress,
			name: 'allowance',
			params: [account, PigsCreditAddress],
		},
		{
			// User BUSD balance
			address: BUSDAddress,
			name: 'balanceOf',
			params: [account],
		},
		{
			// User PIGS balance
			address: PIGSAddress,
			name: 'balanceOf',
			params: [account],
		},
	]

	const callsToPigsCredit = [
		{
			// Pool Info
			address: PigsCreditAddress,
			name: 'availablePigsV2ToClaim',
			params: [account],
		},
	]

	const [busdAllowance, busdBalance, pigsBalance] = await multicall(erc20ABI, erc20Calls)
	const [availablePigsV2ToClaim] = await multicall(pigsCreditAbi, callsToPigsCredit)

	const pigsCreditData = {
		busdAllowance: new BigNumber(busdAllowance).toJSON(),
		busdBalance: new BigNumber(busdBalance).toJSON(),
		pigsBalance: new BigNumber(pigsBalance).toJSON(),
		pigsAvailableToClaim: new BigNumber(availablePigsV2ToClaim).toJSON(),
	}

	return pigsCreditData
}

export const approvePigsCreditSpendBUSD = async (signer: ethers.Signer) => {
	const bep20Contract = getBep20Contract(BUSDAddress, signer)
	await bep20Contract.approve(PigsCreditAddress, LARGE_NUMBER)
}

export const claimInToPigPen = async (amount: string, signer: ethers.Signer) => {
	const pigsCreditContract = getPigCreditContract(signer)
	await pigsCreditContract.claimPigsV2ToPigPen(amount, { gasLimit: 2500000 })
}
