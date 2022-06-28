import BigNumber from 'bignumber.js'
import erc20ABI from 'config/Iabi/erc20.json'
import masterchefDogsABI from 'config/abi/MasterChefDogs.json'
import multicall from 'utils/multicall'
import { getAddress, getDogsMasterChefAddress } from 'utils/addressHelpers'
import { FarmConfig } from 'state/types'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: FarmConfig[]) => {
	const DogsMasterChefAddress = getDogsMasterChefAddress()

	const calls = farmsToFetch.map((farm) => {
		const lpContractAddress = getAddress(farm.lpAddresses)
		return { address: lpContractAddress, name: 'allowance', params: [account, DogsMasterChefAddress] }
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
	const masterChefAddress = getDogsMasterChefAddress()
	const calls = farmsToFetch.map((farm) => {
		return {
			address: masterChefAddress,
			name: 'userInfo',
			params: [farm.pid, account],
		}
	})

	const rawStakedBalances = await multicall(masterchefDogsABI, calls)
	const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
		return new BigNumber(stakedBalance[0]._hex).toJSON()
	})

	const parsedLockedUpDogs = rawStakedBalances.map((stakedBalance) => {
		return new BigNumber(stakedBalance.rewardLockedUp._hex).toJSON()
	})

	const parsedNextHarvest = rawStakedBalances.map((stakedBalance) => {
		return new BigNumber(stakedBalance.nextHarvestUntil._hex).toJSON()
	})

	return [parsedStakedBalances, parsedLockedUpDogs, parsedNextHarvest]
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: FarmConfig[]) => {
	const masterChefAddress = getDogsMasterChefAddress()

	const calls = farmsToFetch.map((farm) => {
		return {
			address: masterChefAddress,
			name: 'pendingDogs',
			params: [farm.pid, account],
		}
	})

	const rawEarnings = await multicall(masterchefDogsABI, calls)
	const parsedEarnings = rawEarnings.map((earnings) => {
		return new BigNumber(earnings).toJSON()
	})
	return parsedEarnings
}

export const fetchFarmUserBusdEarnings = async (account: string, farmsToFetch: FarmConfig[]) => {
	const masterChefAddress = getDogsMasterChefAddress()

	const calls = farmsToFetch.map((farm) => {
		return {
			address: masterChefAddress,
			name: 'pendingBUSD',
			params: [account],
		}
	})

	const rawEarnings = await multicall(masterchefDogsABI, calls)
	const parsedEarnings = rawEarnings.map((earnings) => {
		return new BigNumber(earnings).toJSON()
	})
	return parsedEarnings
}

export const fetchFarmUserCanHarvest = async (account: string, farmsToFetch: FarmConfig[]) => {
	const masterChefAddress = getDogsMasterChefAddress()
	const calls = farmsToFetch.map((farm) => {
		return {
			address: masterChefAddress,
			name: 'canHarvest',
			params: [farm.pid, account],
		}
	})
	const rawEarnings = await multicall(masterchefDogsABI, calls)
	const canHarvest = rawEarnings.map((earnings) => {
		return new BigNumber(earnings).toJSON()
	})
	return canHarvest
}

// export const fetchFarmUserTimeTillHarvest = async (account: string, farmsToFetch: FarmConfig[]) => {
//   const masterChefAddress = getDogsMasterChefAddress()
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
