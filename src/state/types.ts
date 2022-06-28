import BigNumber from 'bignumber.js'

export type SerializedBigNumber = string

export type Response = {
	success: boolean
	data?: any
	message: string
}

export interface Address {
	97?: string
	56: string
}

export interface Token {
	symbol: string
	address?: Address
	decimals?: number
	projectLink?: string
	busdPrice?: string
}

export enum PoolIds {
	poolBasic = 'poolBasic',
	poolUnlimited = 'poolUnlimited',
}

export enum PoolCategory {
	'COMMUNITY' = 'Community',
	'CORE' = 'Core',
	'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
	'AUTO' = 'Auto',
}

export interface FarmConfig {
	pid: number
	lpSymbol: string
	lpAddresses: Address
	token: Token
	quoteToken?: Token
	multiplier?: string
	isCommunity?: boolean
	isPool?: boolean
	isPigFarm: boolean
	lpBusdAddress?: Address
	isPaused?: boolean
	dual?: {
		rewardPerBlock: number
		earnLabel: string
		endBlock: number
	}
}

export interface PoolConfig {
	sousId: number
	earningToken: Token
	stakingToken: Token
	contractAddress: Address
	poolCategory: PoolCategory
	tokenPerBlock: string
	sortOrder?: number
	harvest?: boolean
	isFinished?: boolean
	enableEmergencyWithdraw?: boolean
}

export interface Farm extends FarmConfig {
	depositFee?: string
	tokenAmountMc?: SerializedBigNumber
	quoteTokenAmountMc?: SerializedBigNumber
	tokenAmountTotal?: SerializedBigNumber
	quoteTokenAmountTotal?: SerializedBigNumber
	lpTotalInQuoteToken?: SerializedBigNumber
	lpTotalSupply?: SerializedBigNumber
	tokenPriceVsQuote?: SerializedBigNumber
	poolWeight?: SerializedBigNumber
	userData?: {
		allowance: string
		tokenBalance: string
		stakedBalance: string
		earningsDogs?: string
		earningsLockedDogs?: string
		earningsPigs?: string
		earningsLockedPigs?: string
		earningsBusd?: string
		earningsLockedBusd?: string
		timeTillUnlock?: string
	}
}

export interface FarmWithStakedValue extends Farm {
	apr?: number
	lpRewardsApr?: number
	liquidity?: BigNumber
	lockupPeriod?: string
	isPaused?: boolean
	isPigFarm: boolean
}

export interface FarmEmissions {
	tokenPerBlock: string
	maxEmissionRate: string
	ActiveEmissionIndex: string
	topPriceInCents?: string
	bottomPriceInCents?: string
	vaultBusdBalance?: string
}

export interface DogFarmsState {
	data: Farm[]
	loadArchivedFarmsData: boolean
	userDataLoaded: boolean
}

export interface FarmsState {
	data: Farm[]
	emissions: FarmEmissions
	loadArchivedFarmsData: boolean
	userDataLoaded: boolean
}

export interface PigFarmsState {
	data: Farm[]
	loadArchivedFarmsData: boolean
	userDataLoaded: boolean
}

export interface Pool extends PoolConfig {
	totalStaked?: BigNumber
	stakingLimit?: BigNumber
	startBlock?: number
	endBlock?: number
	apr?: number
	stakingTokenPrice?: number
	earningTokenPrice?: number
	isAutoVault?: boolean
	userData?: {
		allowance: BigNumber
		stakingTokenBalance: BigNumber
		stakedBalance: BigNumber
		pendingReward: BigNumber
	}
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
