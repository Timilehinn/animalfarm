import React, { useState, useCallback, useEffect } from "react";
import BigNumber from "bignumber.js";
import Info from "components/Info/Info";
import Preloader from "components/prealoder/preloader";
import ConnectWalletButton from "components/ConnectWalletButton/ConnectWalletButton";
// import { useSpring, animated } from 'react-spring'
import { Icon } from "@iconify/react";
import { FarmWithStakedValue, Token } from "state/types";
import { useDogFarmFromPid } from "state/dogfarms/hooks";
import {
	getBalanceAmount,
	getDecimalAmount,
	getFullDisplayBalance, amountFormatter
} from "utils/formatBalance";
import { getAddress } from "utils/addressHelpers";
import getLiquidityUrlPathParts from "utils/getLiquidityUrlPathParts";
import { BIG_ZERO } from "utils/bigNumber";
import { AnimalFarmTokens } from "config/constants/animalFarmToken";
import {
	depositWithMasterChefDogs,
	depositWithMasterChefPigs,
	approveLPDogs,
	approveLPPigs,
	claimWithMasterChefDogs,
	claimWithMasterChefPigs,
} from "api/farms";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { ZERO_ADDRESS } from "config/constants";
import tokens from "config/constants/tokens";
import { BASE_ADD_LIQUIDITY_URL } from "config";
import { toast } from "react-toastify";
import styles from "./Farm.module.scss";
import dog from "../../assets/dogg.png";
import pig from "../../assets/busd.png";
import coree from "../../assets/core.png";
import arrow from "../../assets/arrow-down.png";
import arrowup from "../../assets/arrow-up.png";
import linkImage from "../../assets/linkimage.png";

import { useAppSelector, useAppDispatch } from "../../state/hooks";
import {
	toggleConfirmModal,
	setModalProps, 
	toggleModalBackDrop,
	toggleUnstakeModal,
} from "../../state/toggle";

interface FarmCardProps {
	farm: FarmWithStakedValue;
	displayApr: string;
	removed: boolean;
	cakePrice?: BigNumber;
	account?: string;
	current: number;
	setCurrent: any;
}

const getImageUrlFromToken = (token: Token) => {
	const address = getAddress(
		token.symbol === "BNB" ? tokens.wbnb.address : token.address
	);
	if (token.symbol === "DRIP") {
		return `/images/tokens/${address}.png`;
	}
	return `/images/tokens/${address}.svg`;
};

function Farm({
	farm,
	displayApr,
	removed,
	cakePrice,
	account,
	setCurrent,
	current,
}: FarmCardProps) {
	// const props = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: 50 }, delay: 100 })
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isButtonDisabled, setIsButtonDsabled] = useState(true);
	const [pending, setPending] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [isApproved, setIsApprove] = useState(true);
	const { library } = useActiveWeb3React();
	const signer = library.getSigner();
	const dispatch = useAppDispatch();

	const {
		allowance: allowanceAsString = 0,
		tokenBalance: tokenBalanceAsString = 0,
		stakedBalance: stakedBalanceAsString = 0,
		earningsPigs: earningsPigsAsString = 0,
		earningsDogs: earningsDogsAsString = 0,
		earningsBusd: earningsBusdAsString = 0,
		timeTillUnlock: timeTillUnlockAsSting = 0,
	} = farm.userData || {};

	const allowance = new BigNumber(allowanceAsString);
	const tokenBalance = new BigNumber(tokenBalanceAsString);
	const stakedBalance = new BigNumber(stakedBalanceAsString);

	const earningsDogs = new BigNumber(earningsDogsAsString);
	const earningsPigs = new BigNumber(earningsPigsAsString);
	const earningsBusd = new BigNumber(earningsBusdAsString);

	const isPigStaking =
		farm.lpAddresses["56"] === AnimalFarmTokens.pigsToken.address;

	const dogFarmsSingle = useDogFarmFromPid(1);
	// let isPaused = farm.isPaused
	let isPaused = true;
	if (farm.isPigFarm) {
		isPaused = dogFarmsSingle?.isPaused;
	}

	let earnings = farm.isPigFarm ? earningsPigs : earningsDogs;
	earnings = isPigStaking ? earningsBusd : earnings;

	const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO;
	const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN);

	const totalValueFormatted =
		farm.liquidity && farm.liquidity.gt(0)
			? `$${farm.liquidity
					.toNumber()
					.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
			: "N/A";

	const isPigPen =
		farm.lpAddresses["56"] === AnimalFarmTokens.pigsToken.address;
	const lpLabel =
		farm.lpSymbol && farm.lpSymbol.toUpperCase().replace("PANCAKE", "");
	let earnLabel = farm.isPigFarm ? "PIGS" : "DOGS";
	earnLabel = isPigPen ? "BUSD" : earnLabel;

	const lockPeriodText = "4 Hours";
	// const lockPeriodText = farm.lockupPeriod === undefined ? "N/A" : farm.lockupPeriod.toString()

	const liquidityUrlPathParts = getLiquidityUrlPathParts({
		quoteTokenAddress: farm.quoteToken?.address,
		tokenAddress: farm.token.address,
	});
	const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`;
	const lpAddress = getAddress(farm.lpAddresses);
	const isPromotedFarm =
		farm.isPigFarm ||
		farm.lpAddresses["56"] === AnimalFarmTokens.pigsToken.address;
	let depositFeeText = farm.depositFee ? Number(farm.depositFee) / 100 : "0";
	depositFeeText = farm.depositFee ? `${Number(farm.depositFee) / 100}%` : "0%";
	const isDrip =
		farm.lpAddresses["56"] === "0xa0feB3c81A36E885B6608DF7f0ff69dB97491b58";
	const dripExtraText = isDrip
		? (depositFeeText = `${depositFeeText} (Sent To Faucet)`)
		: depositFeeText;

	const handleCollapse = () => {
		if (farm.pid === current) {
			setCurrent(null);
			setIsCollapsed(false);
		} else {
			setCurrent(farm.pid);
			setIsCollapsed(!isCollapsed);
		}
	};

	const displayStakedBalance = () => {
		const stakedBalanceBigNumber = getBalanceAmount(stakedBalance);

		if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
			return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN);
		}
		if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
			return getFullDisplayBalance(stakedBalance).toLocaleString();
		}
		return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN);
	};

	// check approval
	const checkApproval = () => {
		if (new BigNumber(allowance).isLessThan(getDecimalAmount(inputValue))) {
			setIsApprove(false);
		} else {
			setIsApprove(true);
		}
	};

	useEffect(() => {
		checkApproval();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]);
	// check if unstake is disbled
	const isUnstakeDisabled = () => {
		if (account === undefined) {
			return true;
		}
		return false;
	};

	
	// input value
	const handleInputValue = (e) => {
		setInputValue(e.target.value);
		console.log(getDecimalAmount(inputValue));
	};

	useEffect(() => {
		if (inputValue.length > 0) {
			setIsButtonDsabled(false);
		} else {
			setIsButtonDsabled(true);
		}
	}, [inputValue]);

	const deposit = async () => {
		const ref = localStorage.getItem("farmsRef")
		
		setPending(true);
		try {
			if (farm.isPigFarm === true) {
				const res = await depositWithMasterChefPigs(
					farm.pid.toString(),
					getDecimalAmount(amountFormatter(inputValue)),
					ref || ZERO_ADDRESS,
					signer
				);
				if (res.success === true) {
					toast.success("Transaction successful");
				} else {
					toast.error("Transaction failed");
				}
				setPending(false);
			} else {
				const res = await depositWithMasterChefDogs(
					farm.pid.toString(),
					getDecimalAmount(amountFormatter(inputValue)),
					ref || ZERO_ADDRESS,
					signer
				);
				if (res.success === true) {
					toast.success("Transaction successful");
				} else {
					toast.error("Transaction failed");
				}
				setPending(false);
			}
		} catch (err) {
			toast.error("An error occured")
		}
	};

	

	// approve masterchef contract
	const approveMasterChef = async () => {
		setPending(true);
		if (farm.isPigFarm === true) {
			try {
				await approveLPPigs(lpAddress, signer);
				toast.success("Approval Successful");
				setPending(false);
			} catch (err) {
				toast.error("An error occured");

				setPending(false);
			}
		} else {
			try {
				await approveLPDogs(lpAddress, signer);
				toast.success("Approval Successful");
				setPending(false);
			} catch (err) {
				toast.error("An error occured");

				setPending(false);
			}
		}
	};
	// claim
	const claim = async () => {
		const ref = localStorage.getItem("farmsRef")
		if (farm.isPigFarm === true) {
			try {
				const res = await claimWithMasterChefPigs(
					farm.pid.toString(),
					getDecimalAmount("0"),
					signer
				);
				if (res.success === true) {
					toast.success("Claim Successful");
				} else {
					toast.error("Transaction failed!");
				}
			} catch (err) {
				toast.error("An error occured");
				console.log(err)
			}
		} else {
			try {
				const res = await claimWithMasterChefDogs(
					farm.pid.toString(),
					getDecimalAmount("0"),
					ref || ZERO_ADDRESS,
					signer
				);
				if (res.success === true) {
					toast.success("Claim Successful");
				} else {
					toast.error("Transaction failed!");
				}
			} catch (err) {
				toast.error("An error occured");
				console.log(err)
			}
		}
	};

	// stake modal modal props object
	const stakeModalProps = {
		modalTitleText: "Confirm stake",
		confirmButtonText: "Claim",
		value: inputValue,
		text: lpLabel,
		warning:
			"Are you sure you want to stake the specified amount of LP tokens?",
		infoValues: [
			{ title: "Reward", value: farm.isPigFarm ? "PIGS" : "DOGS" },
			{ title: "APR", value: farm.apr },
		],
		confirmFunction: deposit,
	};

	// claim modal props
	const claimModalProps = {
		modalTitleText: "Confirm claim",
		confirmButtonText: "Claim",
		value: displayBalance,
		text: earnLabel,
		warning: "Are you sure you want to claim your rewards?",
		infoValues: [],
		confirmFunction: claim,
	};
	// deposit
	const openConfirmDepositModal = () => {
		dispatch(toggleConfirmModal(true));
		dispatch(setModalProps(stakeModalProps));
		dispatch(toggleModalBackDrop(true));
	};
	// claim function
	const openConfirmClaimModal = () => {
		dispatch(toggleConfirmModal(true));
		dispatch(setModalProps(claimModalProps));
		dispatch(toggleModalBackDrop(true));
	};

	// unstake function
	const unstake = () => {
		dispatch(
			toggleUnstakeModal({
				isUnstakeModalOpen: true,
				lpInfo: {
					lpStaked: lpLabel,
					lpAmount: displayStakedBalance(),
					isPigsFarm: farm.isPigFarm,
					pid: farm.pid.toString(),
				},
			})
		);
		dispatch(toggleModalBackDrop(true));
	};

	return (
		<div className={styles.farm}>
			<header>
				<div className={styles.tokens}>
					<div className={styles.tokens__icons}>
						<img src={getImageUrlFromToken(farm.token)} alt="" />
						<img
							className={styles.img__two}
							src={getImageUrlFromToken(farm.quoteToken)}
							alt=""
						/>
					</div>
					<div className={styles.token__names}>
						<p>{lpLabel}</p>
					</div>
				</div>
				<div className={styles.core}>
					{isPromotedFarm ? (
						<div className={styles.core__button}>
							<img src={coree} alt="" />
							<p>Core</p>
						</div>
					) : (
						""
					)}
					<div className={styles.core__circle}>
						<p>{farm.multiplier}</p>
					</div>
				</div>
			</header>
			<div className={styles.staked}>
				<p>
					<span>{lpLabel} staked:</span> {displayStakedBalance()}
				</p>
				<button
					disabled={isUnstakeDisabled()}
					className={
						isUnstakeDisabled()
							? `${styles.stakeDisabled}`
							: styles.stakeEnabled
					}
					onClick={() => unstake()}
					type="button"
				>
					Unstake
				</button>
			</div>
			<div className={styles.staked}>
				<p>
					<span>{earnLabel} earned:</span>{" "}
					{farm.isPigFarm ? "N/A" : displayBalance}
				</p>
				<button
					disabled={isUnstakeDisabled()}
					className={
						isUnstakeDisabled()
							? `${styles.stakeDisabled}`
							: styles.stakeEnabled
					}
					type="button"
					onClick={() => openConfirmClaimModal()}
				>
					Claim
				</button>
			</div>
			<div className={styles.infoArea}>
				<Info title="Apr:" info={displayApr} />
				<Info title="Earn:" info={earnLabel} />
			</div>
			{/* input */}
			<div className={styles.inputBox}>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div className={styles.logo}>
						{/* <img src={dog} alt='' /> */}
						<p>{lpLabel}</p>
					</div>
					<input
						onChange={(e) => handleInputValue(e)}
						value={amountFormatter(inputValue, 9)}
						min="0"
						required
						type="number"
						placeholder="0.0"
					/>
				</div>
			</div>
			{/* buttons */}
			{account &&
				(isButtonDisabled ? (
					<button type="button" className={styles.button__disabled}>
						{Number(tokenBalance) === 0 ? `Insufficient Balance` : "Enter amount"}
					</button>
				) : pending ? (
					<button type="button" className={styles.button__enabled}>
						<Preloader />
					</button>
				) : (
					<button
						onClick={() =>
							isApproved ? openConfirmDepositModal() : approveMasterChef()
						}
						type="button"
						className={styles.button__enabled}
					>
						{isApproved ? "Deposit" : "Approve"}
					</button>
				))}
			{/* Connect Wallet Button */}
			{!account && <ConnectWalletButton />}

			<div onClick={() => handleCollapse()} className={styles.collapsible}>
				<p>Details</p>
				<img
					src={isCollapsed && current === farm.pid ? arrowup : arrow}
					alt=""
				/>
			</div>
			{farm.pid === current && (
				<div className={styles.bottom__info}>
					<div className={styles.bottom__info__liquidity}>
						<p>Total Liquidity:</p>
						<p>{totalValueFormatted}</p>
					</div>
					<div className={styles.bottom__info__tokens}>
						<span>
							<a target="_blank" rel="noreferrer" href={addLiquidityUrl}>
								<p>Get {lpLabel}</p>
								<Icon icon="eva:external-link-outline" />
							</a>
						</span>
						<span>
							<a
								target="_blank"
								rel="noreferrer"
								href={`https://bscscan.com/address/${lpAddress}`}
							>
								<p>View contract</p>
								<Icon icon="eva:external-link-outline" />
							</a>
						</span>
						<span>
							<a
								target="_blank"
								rel="noreferrer"
								href={`https://pancakeswap.info/pool/${lpAddress}`}
							>
								<p>See pair info</p>
								<Icon icon="eva:external-link-outline" />
							</a>
						</span>
					</div>
				</div>
			)}
		</div>
	);
}

export default Farm;
