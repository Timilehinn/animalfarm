import BigNumber from 'bignumber.js'
import multicall from 'utils/multicall'
import masterchefDogsABI from 'config/abi/MasterChefDogs.json'
import { FarmEmissions } from 'state/types'
import { BIG_TEN } from 'utils/bigNumber'
import { getDogsMasterChefAddress, getRewardsVaultAddress } from 'utils/addressHelpers'
import erc20 from 'config/Iabi/erc20.json'
import tokens from '../../config/constants/tokens'

const fetchFarmEmissions = async (): Promise<FarmEmissions> => {
	console.log('fetchFarmEmissions DOGS')
	const masterChefAddress = getDogsMasterChefAddress()
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
	const [_tokenPerBlock, _maxEmissionRate, _ActiveEmissionIndex, _topPriceInCents, _bottomPriceInCents] = await multicall(masterchefDogsABI, calls)

	const vaultAddress = getRewardsVaultAddress()
	const calls2 = [
		{
			address: tokens.busd.address['56'],
			name: 'balanceOf',
			params: [vaultAddress],
		},
	]
	const [_vaultBusdBalance] = await multicall(erc20, calls2)

	// console.log("_tokenPerBlock: ", _tokenPerBlock.toString())
	// console.log("_maxEmissionRate: ", _maxEmissionRate.toString())
	// console.log("_ActiveEmissionIndex: ", _ActiveEmissionIndex.toString())
	// console.log("_topPriceInCents: ", _topPriceInCents.toString())
	// console.log("_vaultBusdBalance: ", _vaultBusdBalance.toString())

	const tokenPerBlock = new BigNumber(_tokenPerBlock).div(BIG_TEN.pow(18))
	const maxEmissionRate = new BigNumber(_maxEmissionRate).div(BIG_TEN.pow(18))
	const activeEmissionIndex = _ActiveEmissionIndex.toString()

	const vaultBusdBalance = new BigNumber(_vaultBusdBalance).div(BIG_TEN.pow(18))

	return {
		tokenPerBlock: tokenPerBlock.toString(),
		maxEmissionRate: maxEmissionRate.toString(),
		ActiveEmissionIndex: activeEmissionIndex,
		topPriceInCents: _topPriceInCents.toString(),
		bottomPriceInCents: _bottomPriceInCents.toString(),
		vaultBusdBalance: vaultBusdBalance.toString(),
	}
}

export default fetchFarmEmissions
