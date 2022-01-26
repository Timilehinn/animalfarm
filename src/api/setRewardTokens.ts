import { ethers } from 'ethers'

import getDistributorContracts from 'utils/getDistributorContracts'
import { SurgeTokens } from 'config/constants/surgeTokenAddresses'

export const setRewardToSBTC = async (signer: ethers.Signer, toastSuccess, toastError) => {
	const { vaultXDistributorContract } = getDistributorContracts()

	try {
		vaultXDistributorContract
			.connect(signer)
			.setRewardTokenForHolder(SurgeTokens.surgeBTC.address)
			.then(() => {
				toastSuccess('Reward Token Set Successfully!')
			})
			.catch((err) => {
				toastError('Error while setting Reward Token')
				console.error('Error while setting Reward Token: ', err)
			})
	} catch (error) {
		console.error('Error while setting Reward Token: ', error)
	}
}

export const setRewardToSETH = async (signer: ethers.Signer, toastSuccess, toastError) => {
	const { vaultXDistributorContract } = getDistributorContracts()

	try {
		vaultXDistributorContract
			.connect(signer)
			.setRewardTokenForHolder(SurgeTokens.surgeETH.address)
			.then(() => {
				toastSuccess('Reward Token Set Successfully!')
			})
			.catch((err) => {
				toastError('Error while setting Reward Token')
				console.error('Error while setting Reward Token: ', err)
			})
	} catch (error) {
		console.error('Error while setting Reward Token: ', error)
	}
}

export const setRewardToXUSD = async (signer: ethers.Signer, toastSuccess, toastError) => {
	const { vaultXDistributorContract } = getDistributorContracts()

	try {
		vaultXDistributorContract
			.connect(signer)
			.setRewardTokenForHolder(SurgeTokens.surgeXUSD.address)
			.then(() => {
				toastSuccess('Reward Token Set Successfully!')
			})
			.catch((err) => {
				toastError('Error while setting Reward Token')
				console.error('Error while setting Reward Token: ', err)
			})
	} catch (error) {
		console.error('Error while setting Reward Token: ', error)
	}
}

export const setRewardToSADA = async (signer: ethers.Signer, toastSuccess, toastError) => {
	const { vaultXDistributorContract } = getDistributorContracts()

	try {
		vaultXDistributorContract
			.connect(signer)
			.setRewardTokenForHolder(SurgeTokens.surgeADA.address)
			.then(() => {
				toastSuccess('Reward Token Set Successfully!')
			})
			.catch((err) => {
				toastError('Error while setting Reward Token')
				console.error('Error while setting Reward Token: ', err)
			})
	} catch (error) {
		console.error('Error while setting Reward Token: ', error)
	}
}

export const setRewardToSUSLS = async (signer: ethers.Signer, toastSuccess, toastError) => {
	const { vaultXDistributorContract } = getDistributorContracts()

	try {
		vaultXDistributorContract
			.connect(signer)
			.setRewardTokenForHolder(SurgeTokens.surgeUseless.address)
			.then(() => {
				toastSuccess('Reward Token Set Successfully!')
			})
			.catch((err) => {
				toastError('Error while setting Reward Token')
				console.error('Error while setting Reward Token: ', err)
			})
	} catch (error) {
		console.error('Error while setting Reward Token: ', error)
	}
}

export const setRewardToSUSD = async (signer: ethers.Signer, toastSuccess, toastError) => {
	const { vaultXDistributorContract } = getDistributorContracts()

	try {
		vaultXDistributorContract
			.connect(signer)
			.setRewardTokenForHolder(SurgeTokens.surgeUSD.address)
			.then(() => {
				toastSuccess('Reward Token Set Successfully!')
			})
			.catch((err) => {
				toastError('Error while setting Reward Token')
				console.error('Error while setting Reward Token: ', err)
			})
	} catch (error) {
		console.error('Error while setting Reward Token: ', error)
	}
}
