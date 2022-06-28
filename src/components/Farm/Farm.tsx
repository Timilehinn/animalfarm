import React, { useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import Info from 'components/Info/Info'
// import { useSpring, animated } from 'react-spring'
import { Icon } from '@iconify/react'
import { FarmWithStakedValue, Token } from 'state/types'
import { useDogFarmFromPid } from 'state/dogfarms/hooks'
import { getBalanceAmount, getFullDisplayBalance } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { BIG_ZERO } from 'utils/bigNumber'
import { AnimalFarmTokens } from 'config/constants/animalFarmToken'
import tokens from 'config/constants/tokens'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import styles from './Farm.module.scss'
import dog from '../../assets/dogg.png'
import pig from '../../assets/busd.png'
import coree from '../../assets/core.png'
import arrow from '../../assets/arrow-down.png'
import arrowup from '../../assets/arrow-up.png'
import linkImage from '../../assets/linkimage.png'

interface FarmCardProps {
	farm: FarmWithStakedValue
	displayApr: string
	removed: boolean
	cakePrice?: BigNumber
	account?: string
	current: number
	setCurrent: any
}

const getImageUrlFromToken = (token: Token) => {
	const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
	if (token.symbol === 'DRIP') {
		return `/images/tokens/${address}.png`
	}
	return `/images/tokens/${address}.svg`
}

function Farm({ farm, displayApr, removed, cakePrice, account, setCurrent, current }: FarmCardProps) {
	// const props = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: 50 }, delay: 100 })
	const [isCollapsed, setIsCollapsed] = useState(false)

	const {
		allowance: allowanceAsString = 0,
		tokenBalance: tokenBalanceAsString = 0,
		stakedBalance: stakedBalanceAsString = 0,
		earningsPigs: earningsPigsAsString = 0,
		earningsDogs: earningsDogsAsString = 0,
		earningsBusd: earningsBusdAsString = 0,
		timeTillUnlock: timeTillUnlockAsSting = 0,
	} = farm.userData || {}

	const allowance = new BigNumber(allowanceAsString)
	const tokenBalance = new BigNumber(tokenBalanceAsString)
	const stakedBalance = new BigNumber(stakedBalanceAsString)

	const earningsDogs = new BigNumber(earningsDogsAsString)
	const earningsPigs = new BigNumber(earningsPigsAsString)
	const earningsBusd = new BigNumber(earningsBusdAsString)

	const isPigStaking = farm.lpAddresses['56'] === AnimalFarmTokens.pigsToken.address

	const dogFarmsSingle = useDogFarmFromPid(1)
	// let isPaused = farm.isPaused
	let isPaused = true
	if (farm.isPigFarm) {
		isPaused = dogFarmsSingle?.isPaused
	}

	let earnings = farm.isPigFarm ? earningsPigs : earningsDogs
	earnings = isPigStaking ? earningsBusd : earnings

	const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
	const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)

	const totalValueFormatted = farm.liquidity && farm.liquidity.gt(0) ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}` : 'N/A'

	const isPigPen = farm.lpAddresses['56'] === AnimalFarmTokens.pigsToken.address
	const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
	let earnLabel = farm.isPigFarm ? 'PIGS' : 'DOGS'
	earnLabel = isPigPen ? 'BUSD' : earnLabel

	const lockPeriodText = '4 Hours'
	// const lockPeriodText = farm.lockupPeriod === undefined ? "N/A" : farm.lockupPeriod.toString()

	const liquidityUrlPathParts = getLiquidityUrlPathParts({
		quoteTokenAddress: farm.quoteToken?.address,
		tokenAddress: farm.token.address,
	})
	const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
	const lpAddress = getAddress(farm.lpAddresses)
	const isPromotedFarm = farm.isPigFarm || farm.lpAddresses['56'] === AnimalFarmTokens.pigsToken.address
	let depositFeeText = farm.depositFee ? Number(farm.depositFee) / 100 : '0'
	depositFeeText = farm.depositFee ? `${Number(farm.depositFee) / 100}%` : '0%'
	const isDrip = farm.lpAddresses['56'] === '0xa0feB3c81A36E885B6608DF7f0ff69dB97491b58'
	const dripExtraText = isDrip ? (depositFeeText = `${depositFeeText} (Sent To Faucet)`) : depositFeeText

	const handleCollapse = () => {
		if (farm.pid === current) {
			setCurrent(null)
			setIsCollapsed(false)
		} else {
			setCurrent(farm.pid)
			setIsCollapsed(!isCollapsed)
		}
	}

	const displayStakedBalance = () => {
		const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)

		if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
			return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN)
		}
		if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
			return getFullDisplayBalance(stakedBalance).toLocaleString()
		}
		return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
	}

	return (
		<div className={styles.farm}>
			<header>
				<div className={styles.tokens}>
					<div className={styles.tokens__icons}>
						<img src={getImageUrlFromToken(farm.token)} alt='' />
						<img className={styles.img__two} src={getImageUrlFromToken(farm.quoteToken)} alt='' />
					</div>
					<div className={styles.token__names}>
						<p>{lpLabel}</p>
					</div>
				</div>
				<div className={styles.core}>
					{isPromotedFarm ? (
						<div className={styles.core__button}>
							<img src={coree} alt='' />
							<p>Core</p>
						</div>
					) : (
						''
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
				<button type='button'>Unstake</button>
			</div>
			<div className={styles.staked}>
				<p>
					<span>{earnLabel} earned:</span> {farm.isPigFarm ? 'N/A' : displayBalance}
				</p>
				<button type='button'>Claim</button>
			</div>
			<div className={styles.infoArea}>
				<Info title='Apr:' info={displayApr} />
				<Info title='Earn:' info={earnLabel} />
			</div>
			{/* input */}
			<div className={styles.inputBox}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className={styles.logo}>
						{/* <img src={dog} alt='' /> */}
						<p>{lpLabel}</p>
					</div>
					<input min='0' required type='number' placeholder='0.0' />
				</div>
			</div>
			{/* buttons */}
			<div className={styles.buttons}>
				<button type='button'>Enter Amount</button>
			</div>
			<div onClick={() => handleCollapse()} className={styles.collapsible}>
				<p>Details</p>
				<img src={isCollapsed && current === farm.pid ? arrowup : arrow} alt='' />
			</div>
			{farm.pid === current && (
				<div className={styles.bottom__info}>
					<div className={styles.bottom__info__liquidity}>
						<p>Total Liquidity:</p>
						<p>{totalValueFormatted}</p>
					</div>
					<div className={styles.bottom__info__tokens}>
						<span>
							<a target='_blank' rel='noreferrer' href={addLiquidityUrl}>
								<p>Get {lpLabel}</p>
								<Icon icon='eva:external-link-outline' />
							</a>
						</span>
						<span>
							<a target='_blank' rel='noreferrer' href={`https://bscscan.com/address/${lpAddress}`}>
								<p>View contract</p>
								<Icon icon='eva:external-link-outline' />
							</a>
						</span>
						<span>
							<a target='_blank' rel='noreferrer' href={`https://pancakeswap.info/pool/${lpAddress}`}>
								<p>See pair info</p>
								<Icon icon='eva:external-link-outline' />
							</a>
						</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default Farm
