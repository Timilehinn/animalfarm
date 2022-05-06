/* eslint-disable import/order */
import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useSpring, animated } from 'react-spring'
// import { getBUSDPrice } from 'api/getPrice'

import { ClaimToPiggyBank } from 'api/claimPigs'
import { PigsCreditAddress } from 'config/constants'

import { toggleToastNotification, toggleModalBackDrop, toggleConfirmModal, toggleTourModal } from 'state/toggle'
import { getPigsBUSDPrice } from 'utils/getPrice'
import ClaimPigsPen from 'components/ClaimPigsPen/ClaimPigsPen'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import { getBalanceAmountString, getDecimalAmount } from 'utils/formatBalance'
import { setPigsBusdPrice, setPigsCreditData } from 'state/pigs'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { checkAllowance, approveBusd } from '../../api/allowance'
import { getPigsBalance } from '../../api/getPigsBalance'
import { fetchPigsCreditData, approvePigsCreditSpendBUSD, claimInToPigPen } from 'api/pigscredit'

import { useAppSelector, useAppDispatch } from '../../state/hooks'
import { usePigsBalance } from '../../state/balances/hooks'
import styles from './PigsCredit.module.scss'
import pig from '../../assets/pig.png'
import busdIcon from '../../assets/busd.png'
import useToast from 'hooks/useToast'

function PigsCredit() {
	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(./bg/pigscredit.png);
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
		data: { busdAllowance, busdBalance, pigsBalance, pigsAvailableToClaim },
	} = useAppSelector((state) => state.pigsCreditReducer)
	const signer = library.getSigner()

	const dispatch = useAppDispatch()
	const [inputValue, setInputValue] = useState('')
	const [claimToPigPenAmount, setClaimToPigPenAmount] = useState('')
	const [pending, setPending] = useState(false)
	const [isApproved, setIsApproved] = useState(true)
	const [isDisabled, setIsDisabled] = useState(false)
	const [lockDuration, setLockDuration] = useState(0)
	
	const { toastInfo } = useToast()

	const [activeTab, setActiveTab] = React.useState(1)
	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })

	const getBusdPrice = async () => {
		try {
			const res = await getPigsBUSDPrice()
			dispatch(setPigsBusdPrice(res))
		} catch (err) {
			console.log(err)
		}
	}

	const approve = async () => {
		setPending(true)
		try {
			console.log(inputValue, 'tesss')
			await approvePigsCreditSpendBUSD(signer)
			setPending(false)
			setIsApproved(true)
		} catch (err) {
			console.log(err)

			setPending(false)
			setIsApproved(false)
		}
	}

	const claimToPigPen = async () => {

		if(!account){
			toastInfo("Connect wallet to claim to PIg Pen.")	
			return
		}

		try {
			await claimInToPigPen(claimToPigPenAmount, signer)
		} catch (err) {
			console.log(err)
		}
	}

	const claimToPiggy = async () => {
		try {
			const res = await ClaimToPiggyBank(((Number(inputValue) / Number(pigsBusdPrice)) * 10 ** 18).toString(), (Number(inputValue) * 10 ** 18).toString(), lockDuration, signer)
			console.log(res)

			if (res.success === true) {
				dispatch(toggleToastNotification({ state: true, msg: 'Transaction Successful' }))
				setTimeout(() => {
					dispatch(toggleToastNotification(false))
				}, 3000)
			}
			dispatch(toggleConfirmModal(false))
			dispatch(toggleModalBackDrop(false))

			if (res.success === false) {
				dispatch(toggleToastNotification({ state: true, msg: 'Transcation Failed' }))
				dispatch(toggleToastNotification({ state: true, msg: 'Transaction Successful' }))
				setTimeout(() => {
					dispatch(toggleToastNotification(false))
				}, 3000)
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getBusdPrice()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const exec = async () => {
			if (account) {
				dispatch(setPigsCreditData(await fetchPigsCreditData(account)))
			}
		}
		exec()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

	const checkButtonAndApproval = (inputvalue: string) => {
		if (new BigNumber(busdAllowance).isLessThan(getDecimalAmount(inputvalue)) && inputvalue !== null) {
			setIsDisabled(true)
			setIsApproved(false)
		}

		if (new BigNumber(busdAllowance).isGreaterThanOrEqualTo(getDecimalAmount(inputvalue)) && inputvalue !== null) {
			setIsApproved(true)
		}
	}

	const estimatedBusdToPair = Math.ceil(Number(pigsBusdPrice) * Number(pigsAvailableToClaim))

	// tour modal
	useEffect(() => {
		dispatch(toggleTourModal({ state: false, msg: '' }))
		const data = {
			state: true,
			msg: 'Users who were in PigPen when we paused for v2 migration are the only users who need to use the PIGS Crediting UI. If this applies to you then you have two amazing options!Click the PIGPEN crediting tab and utilize the dashboard to send your PIGS to the PigPen or click the Piggy Bank crediting tab and utilize the dashboard to pair your credited PIGS with BUSD and stake them in PIGGYBANK for a 20% bonus!! ',
		}
		setTimeout(() => {
			dispatch(toggleTourModal(data))
		}, 6000)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const modalDetailsForClaimToPiggyBank = {
		modalTitleText: 'Confirm Claim',
		confirmButtonText: 'Claim',
		value: inputValue,
		text: 'PIGS',
		warning: 'All the values above are estimated.',
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
				{/* <div className={styles.pigscredit__header}>
					<p>
						Users who were in PigPen when we paused for v2 migration are the only users who need to utilize the PIGS Crediting UI. If this applies to you, LEARN MORE:{' '}
						<a href={`${window.location.origin}/docs/Animal_Farm_Rebirth_-_Migration__White_Paper_002.pdf#%5B%7B%22num%22%3A29%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22FitH%22%7D%2C733.179%5D`} className={styles.header__a}>
							HERE{' '}
						</a>
					</p>
				</div> */}
				<div className={styles.cards}>
					<div>
						<PigsCreditCard title='PIGS balance' amount={`${Number(getBalanceAmountString(pigsBalance)).toFixed(5)} PIGS`} />
					</div>
					<div>
						<PigsCreditCard title='BUSD balance' amount={`${Number(getBalanceAmountString(busdBalance)).toFixed(5)} BUSD`} />
					</div>
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
							infoValue={`${Number(getBalanceAmountString(pigsAvailableToClaim)).toFixed(5)} PIGS`}
							infoTitle2='Estimated BUSD to pair'
							infoValue2={`${Number(getBalanceAmountString(estimatedBusdToPair.toString())).toFixed(5)} BUSD`}
							token='BUSD'
							icon={busdIcon}
							rewardCenter={false}
							buttonText='Claim'
							warningMsg={false}
							checkButtonAndApproval={checkButtonAndApproval}
							hideAmountInput={false}
							hideApproveButton={false}
							// Modal
							confirmModalProps={modalDetailsForClaimToPiggyBank}
						/>
					)}
				</div>

				{/* <img className={styles.pig} src={pig} alt='' /> */}
			</div>
		</animated.div>
	)
}

export default PigsCredit
