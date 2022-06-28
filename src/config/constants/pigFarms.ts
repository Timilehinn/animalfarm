import { FarmConfig } from 'state/types'
import tokens from './tokens'
import { AnimalFarmTokens } from './animalFarmToken'

const pigFarms: FarmConfig[] = [
	{
		pid: 0,
		lpSymbol: 'DOGS/BUSD',
		lpAddresses: {
			97: '',
			56: AnimalFarmTokens.dogsToken.BUSD_LP,
		},
		token: tokens.dogs,
		quoteToken: tokens.busd,
		isPool: false,
		isPigFarm: true,
	},
	{
		pid: 1,
		lpSymbol: 'DOGS/WBNB',
		lpAddresses: {
			97: '',
			56: AnimalFarmTokens.dogsToken.WBNB_LP,
		},
		token: tokens.dogs,
		quoteToken: tokens.wbnb,
		isPool: false,
		isPigFarm: true,
	},
	{
		pid: 2,
		lpSymbol: 'DRIP/BUSD',
		lpAddresses: {
			97: '',
			56: '0xa0feB3c81A36E885B6608DF7f0ff69dB97491b58',
		},
		token: tokens.drip,
		quoteToken: tokens.busd,
		isPool: false,
		isPigFarm: true,
	},
	{
		pid: 3,
		lpSymbol: 'DOGS',
		lpAddresses: {
			97: '',
			56: AnimalFarmTokens.dogsToken.address,
		},
		token: tokens.dogs,
		quoteToken: tokens.busd,
		isPool: true,
		lpBusdAddress: {
			97: '',
			56: AnimalFarmTokens.dogsToken.BUSD_LP,
		},
		isPigFarm: true,
	},
]

export default pigFarms
