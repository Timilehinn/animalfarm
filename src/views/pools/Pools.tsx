/* eslint-disable react/no-array-index-key */
import React, { useEffect, useCallback, useState, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { ChainId } from '@pancakeswap/sdk'
import { orderBy } from 'lodash'

// Components
import FarmCard from 'components/Farm/Farm'

// State and hooks
import { Farm, FarmWithStakedValue } from 'state/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { usePollDogFarmsData, useDogFarmEmissions, useDogFarms } from 'state/dogfarms/hooks'
import { usePollPigFarmsData, usePigFarmEmissions, usePigFarms } from 'state/pigfarms/hooks'
import { usePricePigBusd, usePriceDogBusd } from 'hooks/pricing'

// Utils
import isArchivedPid from 'utils/farmHelpers'
import { getBalanceAmount, getDecimalAmount } from 'utils/formatBalance'
import { getFarmApr, getFarmGenericApr, getPoolApr } from 'utils/apr'
import { AnimalFarmTokens } from 'config/constants'

import styles from './Pools.module.scss'

const getDisplayApr = (pigRewardsApr?: number, lpRewardsApr?: number) => {
	if (pigRewardsApr && lpRewardsApr) {
		return (pigRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
	}
	if (pigRewardsApr) {
		return pigRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
	}
	return 'N/A'
}

function Farms() {
	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(${window.location.origin}/bg/piggybank.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		)
	}, [])

	usePollDogFarmsData(true)
	usePollPigFarmsData(true)

	const { account } = useActiveWeb3React()
	const { data: farmsDogs, userDataLoaded } = useDogFarms()
	const { data: farmsPigsLP } = usePigFarms()

	const pigPriceUsd = usePricePigBusd()
	const dogPriceUsd = usePriceDogBusd()

	const { tokenPerBlock: tokenPerBlockDogs, maxEmissionRate: maxEmissionRateDogs, ActiveEmissionIndex: ActiveEmissionIndexDog } = useDogFarmEmissions()
	const { tokenPerBlock: tokenPerBlockPigs, maxEmissionRate: maxEmissionRatePigs, ActiveEmissionIndex: ActiveEmissionIndexPigs } = usePigFarmEmissions()

	const [current, setCurrent] = useState(null)
	const [sortOption, setSortOption] = useState('hot')
	const isActive = false // TODO: temporarily set to false so as to show all farms
	const [stakedOnly, setStakedOnly] = useState(false)

	// Users with no wallet connected should see 0 as Earned amount
	// Connected users should see loading indicator until first userData has loaded
	const userDataReady = !account || (!!account && userDataLoaded)

	const _farms = farmsPigsLP.concat(farmsDogs)
	const preFilteredFarmsLP = _farms.filter((farm) => farm.lpAddresses['56'] !== AnimalFarmTokens.pigsToken.address)
	const filteredFarmsLP = preFilteredFarmsLP.filter((farm) => farm.isPool === true)

	const activeFarms = filteredFarmsLP.filter((farm) => !isArchivedPid(farm.pid))
	const inactiveFarms = filteredFarmsLP.filter((farm) => !isArchivedPid(farm.pid))
	const archivedFarms = filteredFarmsLP.filter((farm) => isArchivedPid(farm.pid))

	const stakedOnlyFarms = activeFarms.filter((farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0))

	const stakedInactiveFarms = inactiveFarms.filter((farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0))

	const stakedArchivedFarms = archivedFarms.filter((farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0))

	const farmsList = useCallback(
		(farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
			const farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
				let cakeRewardsAprME
				const lpRewardsAprME = 1
				let totalLiquidity

				if (farm.isPool) {
					const price = farm.isPigFarm ? pigPriceUsd : dogPriceUsd
					const tokenPerBlock = farm.isPigFarm ? tokenPerBlockPigs : tokenPerBlockDogs

					const stakingTokenPrice = farm.tokenPriceVsQuote
					const blocksFromPool = new BigNumber(farm.poolWeight).times(tokenPerBlock)
					const tokenPerBlockFinal = getDecimalAmount(blocksFromPool.toString())

					cakeRewardsAprME = getPoolApr(Number(stakingTokenPrice), price.toNumber(), Number(farm.tokenAmountMc), Number(tokenPerBlockFinal))

					// console.log("cakeRewardsAprME:", cakeRewardsAprME)

					const totalMCStacked = getBalanceAmount(new BigNumber(farm.tokenAmountMc))
					totalLiquidity = totalMCStacked.times(farm.tokenPriceVsQuote)
				}
				return {
					...farm,
					apr: cakeRewardsAprME,
					lpRewardsAprME,
					liquidity: totalLiquidity,
				}
			})

			return farmsToDisplayWithAPR
		},
		[pigPriceUsd, dogPriceUsd, tokenPerBlockDogs, tokenPerBlockPigs]
	)

	const chosenFarmsMemoized = useMemo(() => {
		let chosenFarms = []

		const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
			switch (sortOption) {
				case 'apr':
					return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
				case 'multiplier':
					return orderBy(farms, (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0), 'desc')
				case 'earned':
					return orderBy(farms, (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earningsPigs) : 0), 'desc')
				case 'liquidity':
					return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
				default:
					return farms
			}
		}

		if (stakedOnly) {
			chosenFarms = farmsList(stakedOnlyFarms)
		} else {
			chosenFarms = farmsList(activeFarms)
		}
		// if (isInactive) {
		// 	chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
		// }
		// if (isArchived) {
		// 	chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
		// }

		return sortFarms(chosenFarms)
	}, [sortOption, activeFarms, farmsList, stakedOnly, stakedOnlyFarms])

	return (
		<div className={styles.farms__wrap}>
			<div className={styles.farms}>
				{chosenFarmsMemoized.map((farm, index) => (
					<FarmCard key={index} farm={farm} displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)} cakePrice={pigPriceUsd} account={account} removed={false} current={current} setCurrent={setCurrent} />
				))}
			</div>
		</div>
	)
}

export default Farms
