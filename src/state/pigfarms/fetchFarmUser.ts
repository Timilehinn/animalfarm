import BigNumber from 'bignumber.js'
import erc20ABI from 'config/Iabi/erc20.json'
import masterchefPigsABI from 'config/abi/MasterChefPigs.json'
import multicall from 'utils/multicall'
import { getAddress, getPigsMasterChefAddress } from 'utils/addressHelpers'
import { FarmConfig } from 'state/types'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: FarmConfig[]) => {
	const PigsMasterChefAddress = getPigsMasterChefAddress()

	const calls = farmsToFetch.map((farm) => {
		const lpContractAddress = getAddress(farm.lpAddresses)
		return { address: lpContractAddress, name: 'allowance', params: [account, PigsMasterChefAddress] }
	})

	const rawLpAllowances = await multicall(erc20ABI, calls)

	const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
		return new BigNumber(lpBalance).toJSON()
	})

	return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
	const calls = farmsToFetch.map((farm) => {
		const lpContractAddress = getAddress(farm.lpAddresses)
		return {
			address: lpContractAddress,
			name: 'balanceOf',
			params: [account],
		}
	})

	const rawTokenBalances = await multicall(erc20ABI, calls)
	const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
		return new BigNumber(tokenBalance).toJSON()
	})
	return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
	const masterChefAddress = getPigsMasterChefAddress()
	const calls = farmsToFetch.map((farm) => {
		return {
			address: masterChefAddress,
			name: 'userInfo',
			params: [farm.pid, account],
		}
	})

	const rawStakedBalances = await multicall(masterchefPigsABI, calls)
	const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
		return new BigNumber(stakedBalance[0]._hex).toJSON()
	})

	const parsedLockedUpPigs = rawStakedBalances.map((stakedBalance) => {
		return new BigNumber(stakedBalance.rewardLockedUp._hex).toJSON()
	})

	const parsedNextHarvest = rawStakedBalances.map((stakedBalance) => {
		return new BigNumber(stakedBalance.nextHarvestUntil._hex).toJSON()
	})

	return [parsedStakedBalances, parsedLockedUpPigs, parsedNextHarvest]
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: FarmConfig[]) => {
	const masterChefAddress = getPigsMasterChefAddress()

	const calls = farmsToFetch.map((farm) => {
		return {
			address: masterChefAddress,
			name: 'pendingPigs',
			params: [farm.pid, account],
		}
	})

	const rawEarnings = await multicall(masterchefPigsABI, calls)
	const parsedEarnings = rawEarnings.map((earnings) => {
		return new BigNumber(earnings).toJSON()
	})
	return parsedEarnings
}

export const fetchFarmUserCanHarvest = async (account: string, farmsToFetch: FarmConfig[]) => {
	const masterChefAddress = getPigsMasterChefAddress()
	const calls = farmsToFetch.map((farm) => {
		return {
			address: masterChefAddress,
			name: 'canHarvest',
			params: [farm.pid, account],
		}
	})
	const rawEarnings = await multicall(masterchefPigsABI, calls)
	const canHarvest = rawEarnings.map((earnings) => {
		return new BigNumber(earnings).toJSON()
	})
	return canHarvest
}

// export const fetchFarmUserTimeTillHarvest = async (account: string, farmsToFetch: FarmConfig[]) => {
//   const masterChefAddress = getPigsMasterChefAddress()
//   const calls = farmsToFetch.map((farm) => {
//     return{
//       address: masterChefAddress,
//       name: 'timeTillHarvest',
//       params: [farm.pid, account],
//     }
//   })
//   const rawEarnings = await multicall(masterchefABI, calls)
//   const canHarvest = rawEarnings.map((earnings) => {
//     return new BigNumber(earnings).toJSON()
//   })
//   return canHarvest
//
// }
