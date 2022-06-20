import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BigNumber from 'bignumber.js'

import Info from 'components/Info/Info'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import Preloader from 'components/prealoder/preloader'
import ProgressBarr from 'components/ProgressBar/ProgressBar'
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton'

// State and hooks
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state/hooks'
import { useGarden, usePollGardenData } from 'state/garden/hooks'
import useToast from 'hooks/useToast'
import { setModalProps, toggleConfirmModal, toggleModalBackDrop, toggleGardenModal, toggleFaqModal } from 'state/toggle'

// APIs
import { approveDripGardenForDripBusdLP, buySeeds, plantSeeds, sellSeeds, getEstimatedPlants } from 'api/garden'

// Utils and helpers
import { amountFormatter, getBalanceAmountString, getDecimalAmount } from 'utils/formatBalance'

// Config
import { ZERO_ADDRESS } from 'config/constants'

import styles from './Garden.module.scss'
import busd from '../../assets/bbusd.png'
import drip from '../../assets/drip.png'
import gardenGraphImage from '../../assets/gardengraph.png'

function Garden() {
	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(${window.location.origin}/bg/drip-garden.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		)
	}, [])
	const params = useParams()
	const { garden } = useGarden()
	const { fetchDripGardenData } = usePollGardenData()
	const { account, library } = useActiveWeb3React()
	const signer = library.getSigner()
	const { toastInfo, toastSuccess, toastError } = useToast()
	const dispatch = useAppDispatch()

	const [inputValue, setInputValue] = useState('')
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	// Approve States
	const [isApproved, setIsApproved] = useState(false)
	// Show Approve Button
	const [showApprove, setShowApprove] = useState(true)
	// Pending State
	const [pending, setPending] = useState(false)
	const [pendingCompound, setPendingCompound] = useState(false)
	const [pendingSell, setPendingSell] = useState(false)
	const [pendingApproval, setPendingApproval] = useState(false)
	// Main Button State
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)
	// Estimated Plants
	const [estimatedPlants, setEstimatedPlants] = useState('0')

	// open gardening faq state
	const showGardenInfo = () => {
		dispatch(toggleModalBackDrop(true))
		dispatch(toggleGardenModal(true))
	}

	const showFaqInfo = () => {
		dispatch(toggleModalBackDrop(true))
		dispatch(toggleFaqModal(true))
	}

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

	const SeedProgress = garden ? ((Number(userSeeds) / seedsToPlant) * 100).toString() : '0'
	const userSeedsAvailable = garden ? new BigNumber(garden.userData.availableSeeds) : new BigNumber('0')
	const userAvailableText = Number(userSeedsAvailable) > 0 ? userSeedsAvailable.toString() : '0'
	const userPlantsAvailable = garden ? Math.trunc(Number(garden.userData.seeds) / seedsToPlant) : 'N/A'

	const compoundDisabled = Number(userPlantsAvailable) === 0
	const sellDisabled = Number(userAvailableText) === 0
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

	useEffect(() => {
		if (params.referee) {
			localStorage.setItem('ref', params.referee)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// UseEffect for showing approve button
	useEffect(() => {
		// Allowance check
		if (!inputValue || (inputValue === '0' && isApproved)) {
			setShowApprove(false)
			return
		}
		if (new BigNumber(garden.userData.lpBalance).isLessThan(getDecimalAmount(inputValue))) {
			setShowApprove(false)
			return
		}
		if (new BigNumber(garden.userData.lpAllowance).isLessThan(getDecimalAmount(inputValue))) {
			setShowApprove(true)
			return
		}
		setShowApprove(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue, garden, isApproved])
	// UseEffect for show main button
	useEffect(() => {
		// if (new BigNumber(garden.userData.lpBalance).isLessThan(getDecimalAmount(inputValue))) {
		// 	setIsButtonDisabled(true)
		// 	return
		// }
		if (inputValue > '0') {
			setIsButtonDisabled(false)
		} else {
			setIsButtonDisabled(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue, garden])

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

	const deposit = async () => {
		if (!account) {
			toastInfo('Connect wallet to buy plants')
			return
		}
		let ref

		const savedRef = localStorage.getItem('ref')
		if (savedRef) {
			if (savedRef === account) {
				ref = ZERO_ADDRESS
			} else {
				ref = savedRef
			}
		} else {
			ref = ZERO_ADDRESS
		}

		try {
			setPending(true)

			const res = await buySeeds(ref, getDecimalAmount(amountFormatter(inputValue)), signer)

			if (res.success === true) {
				setInputValue('')
				setPending(false)
				toastSuccess(res.message)
				fetchDripGardenData()
			}

			if (res.success === false) {
				setPending(false)
				toastError(res.message)
			}
		} catch (err) {
			console.error(err)
			setPending(false)
		}
	}
	const compound = async () => {
		if (!account) {
			toastInfo('Connect wallet to plant seeds')
			return
		}
		let ref

		const savedRef = localStorage.getItem('ref')
		if (savedRef) {
			if (savedRef === account) {
				ref = ZERO_ADDRESS
			} else {
				ref = savedRef
			}
		} else {
			ref = ZERO_ADDRESS
		}

		try {
			setPendingCompound(true)

			const res = await plantSeeds(ref, signer)

			if (res.success === true) {
				setPendingCompound(false)
				toastSuccess(res.message)
				fetchDripGardenData()
			}

			if (res.success === false) {
				setPendingCompound(false)
				toastError(res.message)
			}
		} catch (err) {
			console.error(err)
			setPendingCompound(false)
		}
	}
	const sell = async () => {
		if (!account) {
			toastInfo('Connect wallet to Sell Seeds')
			return
		}

		try {
			setPendingSell(true)

			const res = await sellSeeds(signer)

			if (res.success === true) {
				setPendingSell(false)
				toastSuccess(res.message)
				fetchDripGardenData()
			}

			if (res.success === false) {
				setPendingSell(false)
				toastError(res.message)
			}
		} catch (err) {
			console.error(err)
			setPendingSell(false)
		}
	}

	const estimatePlants = async (value: string) => {
		const amountOfPlants = await getEstimatedPlants(getDecimalAmount(amountFormatter(value)), signer)
		setEstimatedPlants(String(Math.trunc(Number(amountOfPlants))))
	}

	const handleInput = (value) => {
		setInputValue(value)
		if (Number(value) > 0) {
			estimatePlants(value)
		} else {
			setEstimatedPlants('0')
		}
	}

	const depositModalDetails = {
		modalTitleText: 'Confirm Buy Plants',
		confirmButtonText: 'Acknowledge',
		value: inputValue,
		text: 'DRIP/BUSD LP',
		warning: 'Deposit into Drip Garden',
		infoValues: [],
		confirmFunction: deposit,
	}
	const compoundModalDetails = {
		modalTitleText: 'Confirm Plant Seeds',
		confirmButtonText: 'Acknowledge',
		value: userSeedsText,
		text: 'Seeds',
		warning: 'Compound into Drip Garden',
		infoValues: [],
		confirmFunction: compound,
	}

	// open confirm modal
	const openDepositModal = () => {
		if (Number(estimatedPlants) < 1) {
			return
		}
		dispatch(toggleModalBackDrop(true))
		dispatch(toggleConfirmModal(true))
		dispatch(setModalProps(depositModalDetails))
	}
	const openCompoundModal = () => {
		dispatch(toggleModalBackDrop(true))
		dispatch(toggleConfirmModal(true))
		dispatch(setModalProps(compoundModalDetails))
	}

	// TODO: function to open and close individual modal with modalbackdrop

	return (
		<div className={styles.addliquidity__wrap}>
			<div className={styles.addliquidity}>
				<div className={styles.cards}>
					<PigsCreditCard title='Total LP locked' amount={`${garden.balance} DRIP/BUSD`} />
				</div>

				<section>
					<header>Buy plants with LP tokens</header>
					<p className={styles.info}>
						Pair BUSD with DRIP tax free here:{' '}
						<a href='https://theanimal.farm/dripliberation' target='_blank' rel='noreferrer'>
							DRIP Liberation
						</a>
					</p>

					<div className={styles.info__area}>
						<div className={styles.bonus}>
							<div className={styles.bonus__in}>Fertilizer(s) Bonus</div>
						</div>
						<Info title='Time' info={timeMultiplierText} />
						<Info title='Balance' info={`${balanceMultiplierText}%`} />
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
							<input min='0' required type='number' value={amountFormatter(inputValue, 9)} onChange={(e) => handleInput(e.target.value)} placeholder='0.0' />
						</div>
						<div className={styles.balance}>
							<p
								onClick={() => {
									setInputValue(amountFormatter(getBalanceAmountString(garden.userData.lpBalance)))
								}}
								role='presentation'
								className={styles.autoFillBusd}
							>
								Balance: {amountFormatter(getBalanceAmountString(garden.userData.lpBalance), 9)}
							</p>
							<p
								onClick={() => {
									setInputValue(amountFormatter(getBalanceAmountString(garden.userData.lpBalance)))
								}}
								role='presentation'
								className={styles.autoFillBusd}
							>
								Max
							</p>
						</div>
					</div>

					{/* Approve Button */}
					{showApprove &&
						account &&
						(pendingApproval ? (
							<button type='button' className={styles.button__enabled}>
								<Preloader />
							</button>
						) : (
							<button onClick={handleApprovePIGS} type='button' className={styles.button__enabled}>
								Approve
							</button>
						))}
					{/* Deposit Button */}
					{account &&
						(isButtonDisabled ? (
							<button type='button' className={styles.button__disabled}>
								{new BigNumber(garden.userData.lpBalance).isLessThan(getDecimalAmount(inputValue)) ? `Insufficient Balance` : 'Enter amount'}
							</button>
						) : pending ? (
							<button type='button' className={styles.button__enabled}>
								<Preloader />
							</button>
						) : (
							<button onClick={openDepositModal} type='button' className={styles.button__enabled}>
								Buy {estimatedPlants} Plants
							</button>
						))}
					{/* Connect Wallet Button */}
					{!account && <ConnectWalletButton />}

					<div className={styles.reward__center}>
						<p className={styles.reward__header}>My Garden</p>
						<div className={styles.info__area}>
							<Info title='Plants Grown' info={`${userMinersText}`} />
							<Info title='Seeds Available' info={`${userSeedsText}`} />
							<Info title='Seeds Available Value' info={`$${usdValueText.toString()} (${userAvailableText} LP)`} />
							<Info title='Seeds Per Day' info={`${productionRateDay.toString()}`} />
						</div>
						<div className={styles.progress}>
							<p>
								{userTimeRemainingText} until ready to sow ({userPlantsAvailable} plants)
							</p>
							<ProgressBarr progress={SeedProgress} />
						</div>
						{account && (
							<div className={styles.reward__center__buttons}>
								{pendingCompound ? (
									<button type='button' id={styles.button__one} className={styles.button__enabled}>
										<Preloader />
									</button>
								) : (
									<button type='button' onClick={openCompoundModal} id={styles.button__one} disabled={compoundDisabled} className={compoundDisabled ? styles.button__disabled : styles.button__enabled}>
										Plant Seeds
									</button>
								)}
								{pendingSell ? (
									<button type='button' id={styles.button__two} className={styles.button__enabled}>
										<Preloader />
									</button>
								) : (
									<button type='button' onClick={sell} id={styles.button__two} disabled={sellDisabled} className={sellDisabled ? styles.button__disabled : styles.button__enabled}>
										Sell seed
									</button>
								)}
							</div>
						)}
					</div>
				</section>

				<div>
					<button className={styles.button__info} type='button' onClick={showGardenInfo}>
						How to start gardening?
					</button>
					<button className={styles.button__info} type='button' onClick={showFaqInfo}>
						Frequently asked questions
					</button>
				</div>

				<div className={styles.about}>
					<h3>About Drip Garden</h3>
					<p>
						The DRIP Garden is a true game where all players start out relatively equal and what determines your payout is how often you plant your seeds(compound) vs. how often you sell them (withdraw). Below is a graph showing the
						buying power over time and balance compared to other games such as Shrimp Farmer and &quot;Miners&quot;. Existing games give insiders over 100,000% more buying power than players who get in after launch, allowing them to drain
						the contract and disincentives new capital from coming in.
					</p>
					<h3>Drip Garden Mechanism</h3>
					<img src={gardenGraphImage} alt='' />
					<p>
						As you can see, the DRIP Garden increases buying power over time and as the balance of the contract grows ensuring that you will always get a fair rate. There is still a benefit to getting in early because the earlier your
						plants get in the ground the larger you can grow your garden and out perform the competition.{' '}
					</p>

					<p>
						The time multiplier is designed to attract new waves capital after we have reached saturation and the contract growth has slowed due to the buying power of new capital creeping up by 0.1% non compounding every day. This means
						there will always be a time in the future where it makes sense for fresh capital to come in and kick start a new wave gardeners!
					</p>
				</div>
			</div>
		</div>
	)
}

export default Garden
