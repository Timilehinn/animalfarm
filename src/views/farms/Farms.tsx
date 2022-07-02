/* eslint-disable react/no-array-index-key */
import React, { useEffect, useCallback, useState, useMemo } from "react";
import BigNumber from "bignumber.js";
import { ChainId } from "@pancakeswap/sdk";
import { orderBy } from "lodash";
import { useNavigate, useParams } from "react-router-dom";

// Components
import FarmCard from "components/Farm/Farm";
import PigsCreditCard from "components/PigsCreditCard/PigsCreditCard";

// State and hooks
import { Farm, FarmWithStakedValue } from "state/types";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import useToast from "hooks/useToast";
import {
	usePollDogCoreFarmData,
	usePollDogFarmsData,
	useDogFarmEmissions,
	useDogFarms,
} from "state/dogfarms/hooks";
import {
	usePollPigCoreFarmData,
	usePollPigFarmsData,
	usePigFarmEmissions,
	usePigFarms,
} from "state/pigfarms/hooks";
import { usePricePigBusd, usePriceDogBusd } from "hooks/pricing";

// Utils
import isArchivedPid from "utils/farmHelpers";
import { getFarmApr, getFarmGenericApr, getPoolApr } from "utils/apr";

import styles from "./Farms.module.scss";

const getDisplayApr = (pigRewardsApr?: number, lpRewardsApr?: number) => {
	if (pigRewardsApr && lpRewardsApr) {
		return (pigRewardsApr + lpRewardsApr).toLocaleString("en-US", {
			maximumFractionDigits: 2,
		});
	}
	if (pigRewardsApr) {
		return pigRewardsApr.toLocaleString("en-US", { maximumFractionDigits: 2 });
	}
	return "N/A";
};

function Farms() {
	useEffect(() => {
		document.body.setAttribute(
			"style",
			`
		background-image: url(${window.location.origin}/bg/pigpen.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		);
	}, []);

	usePollDogFarmsData(true);
	usePollPigFarmsData(true);

	const params = useParams()
	const navigate = useNavigate()
	const { account } = useActiveWeb3React();
	const { data: farmsDogs, userDataLoaded } = useDogFarms();
	const { data: farmsPigsLP } = usePigFarms();
	// console.log('DOGS farms: ', farmsDogs)
	// console.log('PIGS farms: ', farmsPigsLP)

	const pigPriceUsd = usePricePigBusd();
	const dogPriceUsd = usePriceDogBusd();

	const {
		tokenPerBlock: tokenPerBlockDogs,
		maxEmissionRate: maxEmissionRateDogs,
		ActiveEmissionIndex: ActiveEmissionIndexDog,
	} = useDogFarmEmissions();
	const {
		tokenPerBlock: tokenPerBlockPigs,
		maxEmissionRate: maxEmissionRatePigs,
		ActiveEmissionIndex: ActiveEmissionIndexPigs,
	} = usePigFarmEmissions();

	const [current, setCurrent] = useState(null);
	const [sortOption, setSortOption] = useState("hot");
	const isActive = false; // TODO: temporarily set to false so as to show all farms
	const [stakedOnly, setStakedOnly] = useState(false);
	const [ref,setRef] = useState(localStorage.getItem("farmsRef"))

	// Users with no wallet connected should see 0 as Earned amount
	// Connected users should see loading indicator until first userData has loaded
	const userDataReady = !account || (!!account && userDataLoaded);

	const _farms = farmsPigsLP.concat(farmsDogs);
	const filteredFarmsLP = _farms.filter((farm) => farm.isPool === false);

	const activeFarms = filteredFarmsLP.filter(
		(farm) => !isArchivedPid(farm.pid)
	);
	const inactiveFarms = filteredFarmsLP.filter(
		(farm) => !isArchivedPid(farm.pid)
	);
	const archivedFarms = filteredFarmsLP.filter((farm) =>
		isArchivedPid(farm.pid)
	);

	const stakedOnlyFarms = activeFarms.filter(
		(farm) =>
			farm.userData &&
			new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
	);

	const stakedInactiveFarms = inactiveFarms.filter(
		(farm) =>
			farm.userData &&
			new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
	);

	const stakedArchivedFarms = archivedFarms.filter(
		(farm) =>
			farm.userData &&
			new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
	);

	const farmsList = useCallback(
		(farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
			const farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map(
				(farm) => {
					if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
						return farm;
					}

					const price = farm.isPigFarm ? pigPriceUsd : dogPriceUsd;
					const tokensPerBlock = farm.isPigFarm
						? new BigNumber(tokenPerBlockPigs)
						: new BigNumber(tokenPerBlockDogs);

					const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(
						farm.quoteToken.busdPrice
					);

					const { cakeRewardsApr, lpRewardsApr } = isActive
						? getFarmApr(
								new BigNumber(farm.poolWeight),
								price,
								totalLiquidity,
								farm.lpAddresses[ChainId.MAINNET],
								tokensPerBlock
						  )
						: { cakeRewardsApr: 0, lpRewardsApr: 0 };

					return {
						...farm,
						apr: cakeRewardsApr,
						lpRewardsAprME: lpRewardsApr,
						liquidity: totalLiquidity,
					};
				}
			);

			return farmsToDisplayWithAPR;
		},
		[pigPriceUsd, dogPriceUsd, isActive, tokenPerBlockDogs, tokenPerBlockPigs]
	);

	const chosenFarmsMemoized = useMemo(() => {
		let chosenFarms = [];

		const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
			switch (sortOption) {
				case "apr":
					return orderBy(
						farms,
						(farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr,
						"desc"
					);
				case "multiplier":
					return orderBy(
						farms,
						(farm: FarmWithStakedValue) =>
							farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0,
						"desc"
					);
				case "earned":
					return orderBy(
						farms,
						(farm: FarmWithStakedValue) =>
							farm.userData ? Number(farm.userData.earningsPigs) : 0,
						"desc"
					);
				case "liquidity":
					return orderBy(
						farms,
						(farm: FarmWithStakedValue) => Number(farm.liquidity),
						"desc"
					);
				default:
					return farms;
			}
		};

		if (stakedOnly) {
			chosenFarms = farmsList(stakedOnlyFarms);
		} else {
			chosenFarms = farmsList(activeFarms);
		}
		// if (isInactive) {
		// 	chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
		// }
		// if (isArchived) {
		// 	chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
		// }

		return sortFarms(chosenFarms);
	}, [sortOption, activeFarms, farmsList, stakedOnly, stakedOnlyFarms]);

	const toast = useToast()

	const copyRefLink = () => {
		if (navigator.clipboard && navigator.permissions) {
			navigator.clipboard.writeText(`${window.location.origin}/farms/${account}`).then(() => {
				// ..
				toast.toastSuccess("Copied Successfully") 
			})
		} else if (document.queryCommandSupported('copy')) {
			const ele = document.createElement('textarea')
			ele.value = account
			document.body.appendChild(ele) 
			ele.select()
			document.execCommand('copy')
			document.body.removeChild(ele)
		}
	}

	const getRefAndRedirect = () =>{ 
		const _ref = params.referee
		
		if(_ref){
			localStorage.setItem("farmsRef",_ref)
			navigate('/farms')
			setRef(_ref)

			
		}
	}

	useEffect(()=>{
		getRefAndRedirect()
	})

	return (
		<div className={styles.farms__wrap}>
			<div className={styles.cards}>
				<PigsCreditCard title="Your Referrer" amount={ ref !==null ? `${ref.substring(0, 6)} ${'...'} ${ref.substring(ref.length - 4)}` : 'N/A'} />
				<PigsCreditCard title="Commision Earned" amount="N/A" />
				<PigsCreditCard title="Referral Count" amount="N/A" />
			</div>
			{account ? (
					<div className={styles.btn__wrap}>
						<button type='button' className={styles.btn} onClick={copyRefLink}>
							Copy Referral Link
						</button>
					</div>
				) : (
					'')}
			<div className={styles.farms}>
				{chosenFarmsMemoized.map((farm, index) => (
					<FarmCard
						key={index}
						farm={farm}
						displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
						cakePrice={pigPriceUsd}
						account={account}
						removed={false}
						current={current}
						setCurrent={setCurrent}
					/>
				))}
			</div>
		</div>
	);
}

export default Farms;
