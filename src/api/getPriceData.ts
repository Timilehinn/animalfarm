// import axios from "axios"
import { BASE_API } from 'config'
import { VaultTokens } from 'config/constants/vaultTokenAddresses'

export default {
	async getVaultXPriceData(timeInterval) {
		try {
			const data = await fetch(`${BASE_API}/${VaultTokens.vaultBTC.address}?timeWindow=${timeInterval}&limit=100`)

			const response = await data.json()
			return { success: true, data: response }
		} catch (err) {
			return { success: false, data: [] }
		}
	},
	async getVaultSPriceData(timeInterval) {
		try {
			const data = await fetch(`${BASE_API}/${VaultTokens.vaultS.address}?timeWindow=${timeInterval}&limit=100`)

			const response = await data.json()
			return { success: true, data: response }
		} catch (err) {
			return { success: false, data: [] }
		}
	},
}
