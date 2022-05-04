import React, { useEffect, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useSpring, animated } from 'react-spring'
// import { getBUSDPrice } from 'api/getPrice'

import { ClaimToPiggyBank } from 'api/claimPigs'
import { PigsCreditAddress } from 'config/constants'

import { toggleToastNotification, toggleModalBackDrop, toggleConfirmModal } from 'state/toggle'
import { getPigsBUSDPrice } from 'utils/getPrice'
import ClaimPigsPen from 'components/ClaimPigsPen/ClaimPigsPen'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
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
	const busdBalance = useAppSelector((state) => state.balanceReducer.busdBalance)
	const availablePigsToClaim = useAppSelector((state) => state.pigsCreditReducer.pigsAvailableToClaim)
	const signer = library.getSigner()

	const dispatch = useAppDispatch()
	const [pigsBusdPrice, setPigsBusdPrice] = useState(0)
	const [allowance, setAllowance] = useState(null)
	const [busdValue, setBusdValue] = useState('')
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
			console.log(res, 'busd')
			setPigsBusdPrice(res)
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
			console.log(busdValue, 'tesss')
			await approveBusd('0xb5c4569617320146c8510A9Cf432dd2f86acf6d1', (Number(busdValue) * 10 ** 18).toString(), signer)
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
			const res = await ClaimToPiggyBank(((Number(busdValue) / pigsBusdPrice) * 10 ** 18).toString(), (Number(busdValue) * 10 ** 18).toString(), lockDuration, signer)
			console.log(res)

			if (res.success) {
				dispatch(toggleToastNotification({ state: true, msg: 'Success' }))
			}
			dispatch(toggleConfirmModal(false))
			dispatch(toggleModalBackDrop(false))

			setTimeout(() => {
				dispatch(toggleToastNotification(false))
			}, 3000)
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

	const checkButtonAndApproval = (inputValue: number) => {
		if (new BigNumber(allowance).isLessThan((inputValue * 10 ** 18).toString()) && inputValue !== null) {
			setIsDisabled(true)
			setIsApproved(false)
		}

		if (new BigNumber(allowance).isGreaterThanOrEqualTo((inputValue * 10 ** 18).toString()) && inputValue !== null) {
			setIsApproved(true)
		}
	}

	const estimatedBusdToPair = Math.ceil(pigsBusdPrice * availablePigsToClaim)
	// const isButtonEnabled = Boolean(allowance < (busdValue * 10 ** 18).toString() && busdValue !== null)
	// console.log(isButtonEnabled, 'isButtonEnabled')

	return (
		<animated.div style={props} className={styles.pigscredit__wrap}>
			<div className={styles.pigscredit}>
				<div className={styles.pigscredit__header}>
					<p>
						Users who were in PigPen when we paused for v2 migration are the only users who need to utilize the PIGS Crediting UI. If this applies to you, LEARN MORE:{' '}
						<a href={`${window.location.origin}/docs/Animal_Farm_Rebirth_-_Migration__White_Paper_002.pdf#%5B%7B%22num%22%3A29%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22FitH%22%7D%2C733.179%5D`} className={styles.header__a}>
							HERE{' '}
						</a>
					</p>
				</div>
				<div className={styles.cards}>
					<div>
						<PigsCreditCard title='PIGS balance' amount={`${pigsBalance.amount.toFixed(2)} PIGS`} />
					</div>
					<div>
						<PigsCreditCard title='BUSD balance' amount={`${Number(busdBalance).toFixed(2)} BUSD`} />
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
							busdValue={busdValue}
							setBusdValue={setBusdValue}
							isButtonEnabled={isDisabled}
							approve={approve}
							pending={pending}
							isApproved={isApproved}
							lockDuration={lockDuration}
							setLockDuration={setLockDuration}
							_confirmFunction={claimToPiggy}
							available={`${Number(busdBalance).toFixed(2).toString()} BUSD`}
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
