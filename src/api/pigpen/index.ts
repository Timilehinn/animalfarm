import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import erc20ABI from 'config/Iabi/erc20.json'
import pigPenABI from 'config/abi/PigPenV2.json'
import multicall from 'utils/multicall'
import { PIGSAddress, PigPenAddress, LARGE_NUMBER } from 'config/constants'
import { getPigsTokenV2Contract, getPigPenContract } from 'utils/IgetContracts'

// import { PigPenUserData, PigPen, PigPenState } from 'state/pigpen'

export const fetchPigPenData = async (account: string): Promise<any> => {
	const callsToPigsToken = [
		{
			// Allowance
			address: PIGSAddress,
			name: 'allowance',
			params: [account, PigPenAddress],
		},
		{
			// User PIGS balance
			address: PIGSAddress,
			name: 'balanceOf',
			params: [account],
		},
	]
	const callsToPigPen = [
		{
			// Pool Info
			address: PigPenAddress,
			name: 'poolInfo',
			params: [],
		},
		{
			// Claimable rewards
			address: PigPenAddress,
			name: 'pendingRewards',
			params: [account],
		},
		{
			// Amount Staked getPIGSAvailableForWithdrawal
			address: PigPenAddress,
			name: 'userInfo',
			params: [account],
		},
		{
			// PIGS available for withdrawal
			address: PigPenAddress,
			name: 'getPIGSAvailableForWithdrawal',
			params: [account],
		},
		{
			// PIGS available for withdrawal
			address: PigPenAddress,
			name: 'canHarvest',
			params: [account],
		},
	]

	let userData = {}
	let pigPenData = {}

	const [allowance, userPigsBalance] = await multicall(erc20ABI, callsToPigsToken)
	userData = {
		allowance: new BigNumber(allowance).toJSON(),
		tokenBalance: new BigNumber(userPigsBalance).toJSON(),
	}

	const [poolInfo, pendingRewards, userInfo, pigAvailableForWithdrawal, canHarvest] = await multicall(pigPenABI, callsToPigPen)

	pigPenData = {
		lastRewardBlock: new BigNumber(poolInfo.lastRewardBlock._hex).toJSON(),
		pigsSupply: new BigNumber(poolInfo.pigsSupply._hex).toJSON(),
		harvestPercent: new BigNumber(poolInfo.harvestPercent._hex).toJSON(),
		maxLockUpDuration: new BigNumber(poolInfo.maxLockUpDuration._hex).toJSON(),
	}

	userData = {
		...userData,
		stakedBalance: new BigNumber(userInfo.amount._hex).toJSON(),
		startLockTimestamp: new BigNumber(userInfo.startLockTimestamp._hex).toJSON(),
		canHarvest: canHarvest[0],
		pigAvailableForWithdrawal: new BigNumber(pigAvailableForWithdrawal[0]._hex).toJSON(),
		earningsBusd: new BigNumber(pendingRewards[0]._hex).toJSON(),
		earningsPigs: new BigNumber(pendingRewards[1]._hex).toJSON(),
	}

	return { pigPenData, userData }
}

export const approvePigPenSpendPIGS = async (signer: ethers.Signer) => {
	const pigsTokenV2Contract = getPigsTokenV2Contract(signer)
	await pigsTokenV2Contract.approve(PigPenAddress, LARGE_NUMBER)
}

export const depositIntoPigPen = async (amount: string, signer: ethers.Signer) => {
	const pigsTokenV2Contract = getPigPenContract(signer)
	await pigsTokenV2Contract.deposit(amount)
}
