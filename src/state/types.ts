export type Response = {
	success: boolean
	data?: any
	message: string
}

export type GardenState = {
	isInitialized: boolean
	isLoading: boolean
	data: Garden
}

export type Garden = {
	marketSeeds: string
	seedsToHatch: string
	calculatedSeeds?: string
	balance?: string
	timeMultiplier?: string
	balanceMultiplier?: string
	userData?: {
		lpBalance: string
		lpAllowance: string
		plants: string
		seeds: string
		availableSeeds: string
		secondsUntilFull: string
		claimed: string
		last: string
		referrals: string
		usdValue: string
	}
}
