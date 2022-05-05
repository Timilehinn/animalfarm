import React, { useEffect, useState, useCallback } from 'react'
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
import { getDecimalAmount } from 'utils/formatBalance'
import { setPigsBusdPrice } from 'state/pigs'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { checkAllowance, approveBusd } from '../../api/allowance'
import { getPigsBalance } from '../../api/getPigsBalance'

import { useAppSelector, useAppDispatch } from '../../state/hooks'
import { usePigsBalance } from '../../state/balances/hooks'
import styles from './PigsCredit.module.scss'
import pig from '../../assets/pig.png'
import busdIcon from '../../assets/busd.png'


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
	const { pigsBalance, setPigsBalance } = usePigsBalance()
	// const pigsBalance = useAppSelector((state) => state.balanceReducer.pigsBalance)
	const _busdBalance = useAppSelector((state) => state.balanceReducer.busdBalance)
	const availablePigsToClaim = useAppSelector((state) => state.pigsCreditReducer.pigsAvailableToClaim)
	const signer = library.getSigner()

	const dispatch = useAppDispatch()
	const [pigsBusdPrice, _setPigsBusdPrice] = useState(0)
	const [allowance, setAllowance] = useState(null)
	const [inputValue, setInputValue] = useState('')
	const [canApprove, setCanApprove] = useState(false)
	const [pending, setPending] = useState(false)
	const [isApproved, setIsApproved] = useState(true)
	const [isDisabled, setIsDisabled] = useState(false)
	const [lockDuration, setLockDuration] = useState(0)

	const [activeTab, setActiveTab] = React.useState(1)
	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })

	const getBusdPrice = async () => {
		try {
			const res = await getPigsBUSDPrice()
			console.log(Number(res), 'busdpigs price')
			setPigsBusdPrice(res)
			_setPigsBusdPrice(res)
		} catch (err) {
			console.log(err)
		}
	}

	const getAllowanceCallback = useCallback(async () => {
		try {
			const res = await checkAllowance(account, PigsCreditAddress)
			console.log(res, 'allowance')
			setAllowance(res.allowance)
			// if ()
		} catch (err) {
			console.log(err)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const approve = async () => {
		setPending(true)
		try {
			console.log(inputValue, 'tesss')
			await approveBusd('0xb5c4569617320146c8510A9Cf432dd2f86acf6d1', '115792089237316195423570985008687907853269984665640564039457584007913129639935', signer)
			setPending(false)
			setIsApproved(true)
			const data = {
				success: true,
				msg: 'approved',
			}
			console.log(data)
		} catch (err) {
			console.log(err)
			const data = {
				success: false,
				msg: 'not approved',
			} 
			setPending(false)
			setIsApproved(false)
		}
	}

	const claimToPiggy = async () => {
		try {
			const res = await ClaimToPiggyBank(((Number(inputValue) / pigsBusdPrice) * 10 ** 18).toString(), (Number(inputValue) * 10 ** 18).toString(), lockDuration, signer)
			console.log(res)

			if (res.success===true) {
				dispatch(toggleToastNotification({ state: true, msg: 'Transaction Successful' }))
					setTimeout(() => {
					dispatch(toggleToastNotification(false))
				}, 3000)
			}
			dispatch(toggleConfirmModal(false))
			dispatch(toggleModalBackDrop(false))

			if(res.success===false){
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
		Promise.all([getBusdPrice()])
	})

	useEffect(() => {
		const exec = async () => {
			if (account) {
				//
				setPigsBalance(await getPigsBalance(account))
				getAllowanceCallback()
			}
		}

		exec()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

	const checkButtonAndApproval = (inputvalue: string) => {
		if (new BigNumber(allowance).isLessThan(getDecimalAmount(inputvalue)) && inputvalue !== null) {
			setIsDisabled(true)
			setIsApproved(false)
		}

		if (new BigNumber(allowance).isGreaterThanOrEqualTo(getDecimalAmount(inputvalue)) && inputvalue !== null) {
			setIsApproved(true)
		}
	}

	const estimatedBusdToPair = Math.ceil(pigsBusdPrice * availablePigsToClaim)
	// const isButtonEnabled = Boolean(allowance < (busdValue * 10 ** 18).toString() && busdValue !== null)
	// console.log(isButtonEnabled, 'isButtonEnabled')

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
						<PigsCreditCard title='PIGS balance' amount={`${pigsBalance.amount.toFixed(2)} PIGS`} />
					</div>
					<div>
						<PigsCreditCard title='BUSD balance' amount={`${Number(_busdBalance).toFixed(2)} BUSD`} />
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
						<ClaimPigsPen title='Submit Pigs' />
					) : (
						<RewardsCenter
							pigsBusdPrice={pigsBusdPrice}
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
							available={`${Number(_busdBalance).toFixed(2).toString()} BUSD`}
							infoTitle='Available PIGS to claim'
							infoValue={availablePigsToClaim.toFixed(2)}
							infoTitle2='Estimated BUSD to pair'
							infoValue2={estimatedBusdToPair}
							token='BUSD'
							icon={busdIcon}
							rewardCenter={false}
							buttonText='Claim'
							warningMsg={false}
							checkButtonAndApproval={checkButtonAndApproval}
							hideAmountInput={false}
							hideApproveButton={false}
						/>
					)}
				</div>

				{/* <img className={styles.pig} src={pig} alt='' /> */}
			</div>
		</animated.div>
	)
}

export default PigsCredit
