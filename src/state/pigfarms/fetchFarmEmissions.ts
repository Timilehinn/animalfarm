import BigNumber from 'bignumber.js'
import multicall from '../../utils/multicall'
import MasterChefPigs from '../../config/abi/MasterChefPigs.json'
import { FarmEmissions } from '../types'
import { BIG_TEN } from '../../utils/bigNumber'
import { getPigsMasterChefAddress } from '../../utils/addressHelpers'

const fetchFarmEmissions = async (): Promise<FarmEmissions> => {
	console.log('fetchFarmEmissions PIGS')
	const masterChefAddress = getPigsMasterChefAddress()
	const calls = [
		{
			address: masterChefAddress,
			name: 'tokenPerBlock',
			params: [],
		},
		{
			address: masterChefAddress,
			name: 'maxEmissionRate',
			params: [],
		},
		{
			address: masterChefAddress,
			name: 'ActiveEmissionIndex',
			params: [],
		},
		{
			address: masterChefAddress,
			name: 'topPriceInCents',
			params: [],
		},
		{
			address: masterChefAddress,
			name: 'bottomPriceInCents',
			params: [],
		},
	]
	const [_tokenPerBlock, _maxEmissionRate, _ActiveEmissionIndex, _topPriceInCents, _bottomPriceInCents] = await multicall(MasterChefPigs, calls)

	// console.log("_tokenPerBlock: ", _tokenPerBlock.toString())
	// console.log("_maxEmissionRate: ", _maxEmissionRate.toString())
	// console.log("_ActiveEmissionIndex: ", _ActiveEmissionIndex.toString())
	// console.log("_topPriceInCents: ", _topPriceInCents.toString())
	// console.log("_bottomPriceInCents: ", _bottomPriceInCents.toString())

	const tokenPerBlock = new BigNumber(_tokenPerBlock).div(BIG_TEN.pow(18))
	const maxEmissionRate = new BigNumber(_maxEmissionRate).div(BIG_TEN.pow(18))
	const activeEmissionIndex = _ActiveEmissionIndex.toString()

	return {
		tokenPerBlock: tokenPerBlock.toString(),
		maxEmissionRate: maxEmissionRate.toString(),
		ActiveEmissionIndex: activeEmissionIndex,
		topPriceInCents: _topPriceInCents.toString(),
		bottomPriceInCents: _bottomPriceInCents.toString(),
	}
}

export default fetchFarmEmissions
