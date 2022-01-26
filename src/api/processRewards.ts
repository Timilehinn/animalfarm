import { ethers } from 'ethers'

import getDistributorContracts from 'utils/getDistributorContracts'

export const claimVaultXReward = async (signer: ethers.Signer, toastSuccess, toastError) => {
	const { vaultXDistributorContract } = getDistributorContracts()

	try {
		vaultXDistributorContract
			.connect(signer)
			.claimDividend()
			.then(() => {
				toastSuccess('Vault-X Reward Claimed Successfully!')
			})
			.catch((err) => {
				// eslint-disable-next-line no-unused-expressions
				toastError('Error while claiming Vault-X Reward')
				// err.data.message ? toastError(err.data.message) : err.message ? toastError(err.message) : toastError(err)
				console.error('Error while claiming Vault-X Reward: ', err)
			})
	} catch (error) {
		console.error('Error while claiming Vault-X Reward: ', error)
	}
}

export const claimVaultSReward = async (signer: ethers.Signer, toastSuccess, toastError) => {
	const { vaultSDistributorContract } = getDistributorContracts()

	try {
		vaultSDistributorContract
			.connect(signer)
			.claimDividend()
			.then(() => {
				toastSuccess('Vault-S Reward Claimed Successfully!')
			})
			.catch((err) => {
				// eslint-disable-next-line no-unused-expressions
				toastError('Error while claiming Vault-S Reward')
				// err.data.message ? toastError(err.data.message) : err.message ? toastError(err.message) : toastError(err)
				console.error('Error while claiming Vault-S Reward: ', err)
			})
	} catch (error) {
		console.error('Error while claiming Vault-S Reward: ', error)
	}
}

export const reinvestVaultSReward = async (signer: ethers.Signer, toastSuccess, toastError) => {
	const { vaultSDistributorContract } = getDistributorContracts()

	try {
		vaultSDistributorContract
			.connect(signer)
			.reinvestRewards()
			.then(() => {
				toastSuccess('Vault-S Reward Reinvested Successfully!')
			})
			.catch((err) => {
				// eslint-disable-next-line no-unused-expressions
				toastError('Error while reinvesting Vault-S Reward')
				// err.data.message ? toastError(err.data.message) : err.message ? toastError(err.message) : toastError(err)
				console.error('Error while reinvesting Vault-S Reward: ', err)
			})
	} catch (error) {
		console.error('Error while claiming Vault-S Reward: ', error)
	}
}
