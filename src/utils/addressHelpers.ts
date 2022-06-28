import { ChainId } from '@pancakeswap/sdk'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'state/types'

export const getAddress = (address: Address): string => {
	const chainId = process.env.REACT_APP_CHAIN_ID

	if (address === undefined) {
		console.error('NO ADDRESS undefined') // debugger
	}
	return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getCakeAddress = () => {
	return getAddress(tokens.cake.address)
}

export const getDogsMasterChefAddress = () => {
	return getAddress(addresses.masterChefDogs)
}

export const getPigsMasterChefAddress = () => {
	return getAddress(addresses.masterChefPigs)
}

export const getMulticallAddress = () => {
	return getAddress(addresses.multiCall)
}

export const getWbnbAddress = () => {
	return getAddress(tokens.wbnb.address)
}

export const getPancakeProfileAddress = () => {
	return getAddress(addresses.pancakeProfile)
}

export const getGardenAddress = () => {
	return getAddress(addresses.garden)
}

export const getPiggyBankAddress = () => {
	return getAddress(addresses.piggybank)
}

export const getRewardsVaultAddress = () => {
	return getAddress(addresses.rewardsVault)
}

export const getPigCreditAddress = () => {
	return getAddress(addresses.pigscredit)
}

export const getPigpenAddress = () => {
	return getAddress(addresses.pigpen)
}
