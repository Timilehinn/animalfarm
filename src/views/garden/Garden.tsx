import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'

import Info from 'components/Info/Info'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import Preloader from 'components/prealoder/preloader'

// State and hooks
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useGarden, usePollGardenData } from 'state/garden/hooks'
import useToast from 'hooks/useToast'

// APIs
import { approveDripGardenForDripBusdLP } from 'api/garden'

// Utils and helpers
import { amountFormatter, getDecimalAmount } from 'utils/formatBalance'

import styles from './Garden.module.scss'
import busd from '../../assets/bbusd.png'
import drip from '../../assets/drip.png'
import gardenGraphImage from '../../assets/gardengraph.png'

function Garden() {
	const { garden } = useGarden()
	const { fetchDripGardenData } = usePollGardenData()
	const { account, library } = useActiveWeb3React()
	const signer = library.getSigner()
	const { toastInfo, toastSuccess, toastError } = useToast()

	const [inputValue, setInputValue] = useState('')
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	// Approve States
	const [isApproved, setIsApproved] = useState(false)
	// Show Approve Button
	const [showApprove, setShowApprove] = useState(true)
	// Pending State
	const [pending, setPending] = useState(false)
	const [pendingApproval, setPendingApproval] = useState(false)
	// Main Button State
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	const seedsToPlant = 2592000
	const usdValue = garden ? new BigNumber(garden.userData.usdValue) : new BigNumber('0')
	const usdValueText = Number(usdValue) > 0 ? usdValue.toString() : '0'

	const marketEggs = garden ? new BigNumber(garden.marketSeeds) : new BigNumber('0')
	const eggsToHatch = garden ? new BigNumber(garden.seedsToHatch) : new BigNumber('0')

	const contractBalance = garden ? new BigNumber(garden.balance) : new BigNumber('0')

	const userMiners = garden ? new BigNumber(garden.userData.plants) : new BigNumber('0')
	const userMinersText = Number(userMiners) > 0 ? userMiners.toString() : '0'

	const userSecondsUntilFull = garden ? new BigNumber(garden.userData.secondsUntilFull) : new BigNumber('0')

	const userSeeds = garden ? new BigNumber(garden.userData.seeds) : 0
	const userSeedsText = Number(userSeeds) > 0 ? userSeeds.toString() : '0'

	const SeedProgress = garden ? (Number(userSeeds) / seedsToPlant) * 100 : 0
	const userSeedsAvailable = garden ? new BigNumber(garden.userData.availableSeeds) : new BigNumber('0')
	const userAvailableText = Number(userSeedsAvailable) > 0 ? userSeedsAvailable.toString() : '0'
	const userPlantsAvailable = garden ? Math.trunc(Number(garden.userData.seeds) / seedsToPlant) : 'N/A'

	const compoundDisabled = Number(userPlantsAvailable) === 0
	// console.log("Number(userMiners): ", Number(userMiners).toString())
	// console.log("compoundDisabled: ", compoundDisabled)

	const userClaimed = garden ? new BigNumber(garden.userData.claimed) : new BigNumber('0')
	const userLast = garden ? new BigNumber(garden.userData.last) : new BigNumber('0')
	const userReferrals = garden ? new BigNumber(garden.userData.referrals) : new BigNumber('0')
	const productionRate = garden ? userMiners : 0
	const productionRateDay = productionRate > 0 ? userMiners.multipliedBy(60 * 60 * 24) : '0'

	// const timeTillGrown = Math.trunc((seedsToPlant - Number(userSeeds) / Number(productionRate)))
	const timeTillGrown = (seedsToPlant - Number(userSeeds)) / Number(productionRate)
	const userTimeRemainingText = productionRate > 0 ? secondsToString(timeTillGrown) : 'N/A'

	const timeMultiplier = garden ? (Number(garden.timeMultiplier) / 1e7).toFixed(2) : 'N/A'
	const timeMultiplierText = garden ? `${timeMultiplier}%` : 'N/A'

	// const balanceMultiplier = garden ? (Number(garden.balanceMultiplier) / 1e4).toFixed(2) : "N/A"
	const balanceMultiplier = garden ? (Number(garden.balanceMultiplier) / 1e4).toFixed(2) : 'N/A'
	const balanceMultiplierText = '294.29'
	const totalMultiplierText = garden ? `${(Number(timeMultiplier) + Number(balanceMultiplierText)).toFixed(2)}%` : 'N/A'

	function secondsToString(seconds) {
		const secondsMaxxed = Math.max(seconds, 0)
		const numdays = Math.floor(secondsMaxxed / 86400)
		const numhours = Math.floor((secondsMaxxed % 86400) / 3600)
		const numminutes = Math.floor(((secondsMaxxed % 86400) % 3600) / 60)
		const numseconds = ((secondsMaxxed % 86400) % 3600) % 60
		const endstr = ''
		// return numhours + "h " + numminutes + "m "//+numseconds+"s";
		return `${numdays}d ${numhours}h ${numminutes}m`
	}

	// UseEffect for showing approve button
	useEffect(() => {
		// Allowance check
		if (!inputValue || (inputValue === '0' && isApproved)) {
			setShowApprove(false)
			return
		}
		// TODO: Uncomment this code
		// if (new BigNumber(garden.userData.lpBalance).isLessThan(getDecimalAmount(inputValue))) {
		// 	setShowApprove(false)
		// 	return
		// }
		if (new BigNumber(garden.userData.lpAllowance).isLessThan(getDecimalAmount(inputValue))) {
			setShowApprove(true)
			return
		}
		setShowApprove(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue, garden, isApproved])

	const handleApprovePIGS = async () => {
		if (!account) {
			toastInfo('Connect wallet to approve!')
			return
		}

		setPendingApproval(true)

		try {
			await approveDripGardenForDripBusdLP(signer)
			toastSuccess(`Approve DRIP/BUSD Successful!`)
			fetchDripGardenData()
			setPendingApproval(false)
			setIsApproved(true)
		} catch (err) {
			console.error(err)
			toastError('Failed to approve DRIP/BUSD. Try again!')
			setPendingApproval(false)
			setIsApproved(false)
		}
	}

	const deposit = () => {
		return ''
	}

	return (
		<div className={styles.addliquidity__wrap}>
			<div className={styles.addliquidity}>
				<div className={styles.cards}>
					<PigsCreditCard title='Total LP locked' amount={`${garden.balance} DRIP/BUSD`} />
				</div>

				<section>
					<header>Buy plants with LP tokens</header>

					<div className={styles.info__area}>
						<div className={styles.bonus}>
							<div className={styles.bonus__in}>Ferterlizers Bonus</div>
						</div>
						<Info title='Time' info={timeMultiplierText} />
						<Info title='Balance' info={balanceMultiplierText} />
						<Info title='Total' info={totalMultiplierText} />
					</div>
					{/* input 1 */}
					<div className={styles.inputBox}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.logo}>
								<img src={busd} alt='' />
								<img id={styles.drip} src={drip} alt='' />
								<p>DRIP/BUSD LP</p>
							</div>
							<input min='0' required type='number' value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='0.0' />
						</div>
					</div>
					{/* buttons */}
					{showApprove &&
						(pendingApproval ? (
							<button type='button' className={styles.button__enabled}>
								<Preloader />
							</button>
						) : (
							<button onClick={handleApprovePIGS} type='button' className={styles.button__enabled}>
								Approve
							</button>
						))}
					{/* Swap Button */}
					{isButtonDisabled ? (
						<button type='button' className={styles.button__disabled}>
							{Number(garden.userData.lpBalance) === 0 ? `Insufficient DRIP/BUSD LP Balance` : 'Enter amount'}
						</button>
					) : pending ? (
						<button type='button' className={styles.button__enabled}>
							<Preloader />
						</button>
					) : (
						<button onClick={deposit} type='button' className={styles.button__enabled}>
							Deposit
						</button>
					)}
					<div className={styles.reward__center}>
						<p className={styles.reward__header}>My Garden</p>
						<div className={styles.info__area}>
							<Info title='Plants Grown' info={`${userMinersText}`} />
							<Info title='Seeds Available' info={`${userSeedsText}`} />
							<Info title='Seeds Available Value' info={`$${usdValueText.toString()} (${userAvailableText} LP)`} />
							<Info title='Seeds Per Day' info={`${productionRateDay.toString()}`} />
						</div>
						<div className={styles.reward__center__buttons}>
							<button type='button' id={styles.button__one} className={styles.button__disabled}>
								Compound seed
							</button>
							<button type='button' id={styles.button__two} className={styles.button__disabled}>
								Sell seed
							</button>
						</div>
					</div>
				</section>
				<div className={styles.about}>
					<h3>About Drip Garden</h3>
					<p>
						The piggy bank is the first ever non-inflationary variable time staking annuity. Stake pigs/busd lp tokens to earn up to 3% daily roi!! to unlock referral bonuses you must have dogs staked in the single asset staking pool (see
						bottom of page). Time lock your harvest to earn a massive bonus on yield, airdrop stakes to friends and family using the gift stake function, most importantly take control of your financial future on the animal farm!!
					</p>
					<h3>Drip Garden Mechanism</h3>
					<p>
						As you can see, the DRIP Garden increases buying power over time and as the balance of the contract grows ensuring that you will always get a fair rate. There is still a benefit to getting in early because the earlier your
						plants get in the ground the larger you can grow your garden and out perform the competition. The time multiplier is designed to attract new waves capital after we have reached saturation and the contract growth has slowed due
						to the buying power of new capital creeping up by 0.1% non compounding every day. This means there will always be a time in the future where it makes sense for fresh capital to come in and kick start a new wave gardeners!
					</p>
					<img src={gardenGraphImage} alt='' />
				</div>
			</div>
		</div>
	)
}

export default Garden
