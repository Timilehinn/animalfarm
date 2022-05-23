// Libraries and packages
import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useSpring, animated } from 'react-spring'

// Types
import type { PigPenUserData } from 'state/pigpen'

// Components
import ClaimPigsPen from 'components/ClaimPigsPen/ClaimPigsPen'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import RewardsCenter from 'components/RewardsCenter/RewardsCenter'

// State and hooks
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { setPigsBusdPrice, setPigsCreditData } from 'state/pricing'
import { toggleModalBackDrop, toggleConfirmModal, toggleTourModal } from 'state/toggle'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useToast from 'hooks/useToast'

// APIs
import { ClaimToPiggyBank } from 'api/claimPigs'
import { approveBusd } from 'api/allowance'
import { fetchPigsCreditData, claimInToPigPen } from 'api/pigscredit'
import { fetchPigPenData, claimRewardPigPen } from 'api/pigpen'

// Utils and helpers
import { getBalanceAmountString, getDecimalAmount, amountFormatter } from 'utils/formatBalance'
import { getPigsBUSDPrice } from 'utils/getPrice'

// Config
import { LARGE_NUMBER, PigsCreditAddress } from 'config/constants'

// Styles and Images
import styles from './PigsCredit.module.scss'
import busdIcon from '../../assets/busd.png'

function PigsCredit() {
	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(${window.location.origin}/bg/pigscredit.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		)
	}, [])

	const { account, library } = useActiveWeb3React()

	/// THIS IS ALL THE DATA NEEDED ///
	const {
		pigsBusdPrice,
		data: { busdAllowance, busdBalance, pigsAvailableToClaim },
	} = useAppSelector((state) => state.pricingReducer) // TODO: Move pigsCredit out of pricing state

	const signer = library.getSigner()

	const dispatch = useAppDispatch()
	const [inputValue, setInputValue] = useState('')
	const [claimToPigPenAmount, setClaimToPigPenAmount] = useState('')
	const [pending, setPending] = useState(false)
	const [isApproved, setIsApproved] = useState(true)
	const [isDisabled, setIsDisabled] = useState(false)
	const [lockDuration, setLockDuration] = useState(0)
	const [_userPigPenData, _setUserPigPenData] = useState<PigPenUserData>()

	// State for button
	const [claimButtonText, setClaimButtonText] = useState('Claim')

	// For Slippage tolerance
	const [tolerance, setTolerance] = React.useState('10')

	const { toastInfo, toastSuccess, toastError } = useToast()

	const [activeTab, setActiveTab] = React.useState(1)
	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })

	useEffect(() => {
		getBusdPrice()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])
	// tour modal
	useEffect(() => {
		dispatch(toggleTourModal({ state: false, msg: '' }))
		const data = {
			state: true,
			msg: 'Users who were in PigPen when we paused for v2 migration are the only users who need to use the PIGS Crediting UI. If this applies to you then you have two amazing options! Click the PIGPEN crediting tab and utilize the dashboard to send your PIGS to the PigPen or click the Piggy Bank crediting tab and utilize the dashboard to pair your credited PIGS with BUSD and stake them in PIGGYBANK for a 2% bonus!!. If you have intentions to deposit more to a stake (unlocked stake), do not compound- rather deposit into it directly.',
		}
		setTimeout(() => {
			const pigCreditInfo = localStorage.getItem('pigCreditInfo')

			if (pigCreditInfo) {
				dispatch(toggleTourModal(data))
				// localStorage.setItem('pigCreditInfo', 'pigCreditInfo')
			}
		}, 6000)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (account) {
			getMyPigPenData()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

	/// Helper Functions
	const resetInputs = () => {
		setInputValue('')
		setLockDuration(0)
	}
	const shouldDisableMainButton = (): boolean => {
		if (!inputValue || (inputValue === '0' && !isApproved)) {
			return true
		}

		if (new BigNumber(busdAllowance).isLessThan(getDecimalAmount(inputValue))) {
			return true
		}
		return false
	}

	const showApproveButton = (): boolean => {
		if (!inputValue || (inputValue === '0' && isApproved)) {
			return false
		}
		if (new BigNumber(busdAllowance).isLessThan(getDecimalAmount(inputValue))) {
			return true
		}
		return false
	}

	const checkButtonAndApproval = (inputvalue: string) => {
		if (new BigNumber(busdAllowance).isLessThan(getDecimalAmount(inputvalue))) {
			setIsDisabled(true)
			setIsApproved(false)
		}

		if (new BigNumber(busdAllowance).isGreaterThanOrEqualTo(getDecimalAmount(inputvalue)) && inputvalue !== null) {
			setIsApproved(true)
		}
	}

	const estimatedBusdToPair = Math.ceil(Number(pigsBusdPrice) * Number(pigsAvailableToClaim))

	/// API CALLS
	const getMyPigPenData = async () => {
		dispatch(setPigsCreditData(await fetchPigsCreditData(account)))
		// Fetch PigPen data temporarily
		const res = await fetchPigPenData(account)
		_setUserPigPenData(res.pigPenData)
	}
	const getBusdPrice = async () => {
		try {
			const res = await getPigsBUSDPrice()
			dispatch(setPigsBusdPrice(res))
		} catch (err) {
			console.error(err)
		}
	}
	const approve = async () => {
		if (!account) {
			toastInfo('Connect wallet to approve')
			return
		}
		setPending(true)
		setIsDisabled(true)
		try {
			await approveBusd(PigsCreditAddress, LARGE_NUMBER, signer)
			toastSuccess(`Approve Successful!`)
			getMyPigPenData()
			setPending(false)
			setIsApproved(true)
			setIsDisabled(false)
		} catch (err) {
			console.error(err)
			toastError('Failed to approve. Try again!')
			setPending(false)
			setIsApproved(false)
			setIsDisabled(false)
		}
	}
	const claimToPigPen = async () => {
		if (!account) {
			toastInfo('Connect wallet to claim to PIg Pen.')
			return
		}

		setPending(true)
		try {
			if (new BigNumber(_userPigPenData.earningsBusd).isGreaterThan(0) || new BigNumber(_userPigPenData.earningsPigs).isGreaterThan(0)) {
				setClaimButtonText('Claiming Rewards...')
				toastInfo('Claiming pending rewards!')
				await claimRewardPigPen(true, signer)
			}

			setClaimButtonText('Claiming...')
			const formattedNumber = amountFormatter(claimToPigPenAmount, 18)
			await claimInToPigPen(getDecimalAmount(formattedNumber), signer)
			setClaimButtonText('Claim')
			setPending(false)
			toastSuccess(`Successfully claimed ${Number(formattedNumber)} PIGS to PigPen!`)
			getMyPigPenData()
		} catch (err) {
			console.error(err)
			toastError('An error occured. Try again.')
		}
	}
	const claimToPiggy = async () => {
		if (!account) {
			toastInfo('Connect wallet to claim reward')
			return
		}
		try {
			const formattedInput = amountFormatter(inputValue, 18)
			const formattedPrice = amountFormatter(pigsBusdPrice.toString(), 18)

			const res = await ClaimToPiggyBank(getDecimalAmount(new BigNumber(formattedInput).dividedBy(formattedPrice).toString()), getDecimalAmount(formattedInput), lockDuration, tolerance, signer)

			if (res.success === true) {
				resetInputs()
				toastSuccess(`Successfully claimed to PiggyBank!`)
				getMyPigPenData()
			}

			dispatch(toggleConfirmModal(false))
			dispatch(toggleModalBackDrop(false))

			if (res.success === false) {
				toastError('An error occured. Try again.')
			}
		} catch (err) {
			console.error(err)
		}
	}

	/// Data Props
	const modalDetailsForClaimToPiggyBank = {
		modalTitleText: 'Confirm Claim',
		confirmButtonText: 'Claim',
		value: `${Math.ceil(Number(inputValue) / Number(pigsBusdPrice)).toString()} / ${inputValue}`,
		text: 'PIGS / BUSD',
		warning: '*Estimated values.',
		infoValues: [
			{ title: 'PIGS deposited', value: Math.ceil(Number(inputValue) / Number(pigsBusdPrice)).toString() },
			{ title: 'BUSD deposited', value: inputValue },
			{ title: '1 PIGS(s)', value: pigsBusdPrice },
			{ title: '1 BUSD', value: (1 / Number(pigsBusdPrice)).toString() },
		],
		confirmFunction: claimToPiggy,
	}

	return (
		<animated.div style={props} className={styles.pigscredit__wrap}>
			<div className={styles.pigscredit}>
				<div className={styles.cards}>
					<PigsCreditCard title='Credited PIGS' amount={`${amountFormatter(getBalanceAmountString(pigsAvailableToClaim), 9)} PIGS`} />
				</div>
				<div className={styles.credit__wrap}>
					<div className={styles.tabs}>
						<div onClick={() => setActiveTab(1)} className={activeTab === 1 ? `${styles.tab__one} ${styles.tab__one__active}` : `${styles.tab__one}`}>
							<p>Claim to Pig Pen</p>
						</div>
						<div onClick={() => setActiveTab(2)} className={activeTab === 2 ? `${styles.tab__two} ${styles.tab__two__active}` : `${styles.tab__two}`}>
							<p>Claim to Piggy Bank</p>
						</div>
					</div>
					{activeTab === 1 ? (
						<ClaimPigsPen title='Submit Pigs' pigsAvailableToClaim={pigsAvailableToClaim} claimToPigPenAmount={claimToPigPenAmount} setClaimToPigPenAmount={setClaimToPigPenAmount} claimToPigPen={claimToPigPen} />
					) : (
						<RewardsCenter
							mainButtonDisabled={shouldDisableMainButton()}
							approveButtonVisible={showApproveButton()}
							pigsBusdPrice={Number(pigsBusdPrice)}
							Lock
							pair
							text='PIGS/BUSD LP Tokens'
							sliderRequired
							title='Submit PIGS/BUSD LP'
							inputValue={inputValue}
							setInputValue={setInputValue}
							isButtonEnabled={isDisabled}
							approve={approve}
							pending={pending}
							isApproved={isApproved}
							lockDuration={lockDuration}
							setLockDuration={setLockDuration}
							confirmFunction={claimToPiggy}
							available={`${Number(busdBalance).toFixed(2).toString()} BUSD`}
							infoTitle='Available PIGS to claim'
							infoValue={`${amountFormatter(getBalanceAmountString(pigsAvailableToClaim), 9)} PIGS`}
							infoTitle2='Estimated BUSD to pair'
							infoValue2={`${new BigNumber(getBalanceAmountString(estimatedBusdToPair.toString())).toFormat(2)} BUSD`}
							token='BUSD'
							icon={busdIcon}
							rewardCenter={false}
							buttonText={claimButtonText}
							warningMsg={false}
							checkButtonAndApproval={checkButtonAndApproval}
							hideAmountInput={false}
							hideApproveButton={false}
							// Modal
							confirmModalProps={modalDetailsForClaimToPiggyBank}
							pigBal={false}
							// Slippage tolerance
							slippage
							tolerance={tolerance}
							setTolerance={setTolerance}
							autoFillBusd
						/>
					)}
				</div>

				{/* <img className={styles.pig} src={pig} alt='' /> */}
			</div>
		</animated.div>
	)
}

export default PigsCredit
