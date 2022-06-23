/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'
import PiggyBankTable from 'components/PiggyBankTable/PiggyBankTable'
import ReferralTable from 'components/ReferralTable/ReferralTable'
import PiggyBankInfo from 'components/PiggyBankInfo/PiggyBankInfo'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { toggleToastNotification, toggleTourModal, toggleConfirmModal, toggleModalBackDrop } from 'state/toggle'
// import { getMyPiggyBanks } from 'api/piggyBank/getMyPiggyBanks'
import { fetchPiggyBankData } from 'api/Ipiggybank'

import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import { amountFormatter, getDecimalAmount } from 'utils/formatBalance'

import { useAppDispatch } from 'state/hooks'
import BigNumber from 'bignumber.js'
import { usePiggyBank } from 'state/piggybank/hooks'
import { approvePiggyBankForPigBusdLP } from 'api/allowance'
import { useParams } from 'react-router-dom'

import { longerPaysBetterBonusPercents } from 'utils/lockBonusPercentage'
import useToast from 'hooks/useToast'
import { useAppSelector } from '../../state/hooks'
import styles from './PiggyBank.module.scss'
import pig from '../../assets/svgg.png'

import { LARGE_NUMBER, ZERO_ADDRESS } from '../../config/constants'
import { buyPigLets, giftPiglet, compoundAllStakes } from '../../api/piggyBank/getMyPiggyBanks'

function PiggyBank() {
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

	const { account, library } = useActiveWeb3React()
	const params = useParams()
	const dispatch = useAppDispatch()
	const signer = library.getSigner()
	const { piggybank, setPiggyBank, setAllowance } = usePiggyBank()
	// const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState(1)
	const [lockDuration, setLockDuration] = useState(0)
	// const [pending, setPending] = useState(false)
	const [isApproved, setIsApproved] = useState(false)
	const [isDisabled, setIsDisabled] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [inputValue2, setInputValue2] = useState('')

	const { toastInfo, toastError, toastSuccess } = useToast()
	const userPiglets = useAppSelector((state) => state.piggyBankReducer.data.userData.userPiggyBanks)

	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })

	const copyRefLink = () => {
		if (navigator.clipboard && navigator.permissions) {
			navigator.clipboard.writeText(`${window.location.origin}/piggy-bank/${account}`).then(() => {
				// ..
				toastSuccess("Copied Successfully") 
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

	useEffect(() => {
		dispatch(toggleTourModal({ state: false, msg: '' }))
		const data = {
			state: true,
			msg: 'The piggy bank is the first ever non-inflationary variable time staking annuity. Stake PIGS/BUSD LP tokens to earn up to 3% daily ROI!! Earn a 2% referral bonus for on boarding new users.',
		}
		setTimeout(() => {
			const piggyBankInfo = localStorage.getItem('piggyBankInfo')
			if (piggyBankInfo) {
				dispatch(toggleTourModal(data))
				// localStorage.setItem('piggyBankInfo', 'piggyBankInfo')
			}
		}, 3000)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		getMyPiggyBank()
		if (params.referee) {
			localStorage.setItem('ref', params.referee)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		if (account) {
			getMyPiggyBank()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

	/// Helper Functions ///
	const shouldDisableMainButton = (): boolean => {
		if (!inputValue || (inputValue === '0' && !isApproved)) {
			return true
		}

		if (new BigNumber(piggybank.userData.lpAllowance).isLessThan(getDecimalAmount(inputValue))) {
			return true
		}
		return false
	}

	const showApproveButton = (): boolean => {
		if (!inputValue || (inputValue === '0' && isApproved)) {
			return false
		}
		if (new BigNumber(piggybank.userData.lpAllowance).isLessThan(getDecimalAmount(inputValue))) {
			return true
		}
		return false
	}

	const checkButtonAndApproval = (inputvalue: string) => {
		if (new BigNumber(piggybank.userData.lpAllowance).isLessThan(getDecimalAmount(inputvalue)) && inputvalue !== null) {
			setIsDisabled(true)
			setIsApproved(false)
		}

		if (new BigNumber(piggybank.userData.lpAllowance).isGreaterThanOrEqualTo(getDecimalAmount(inputvalue)) && inputvalue !== null) {
			setIsApproved(true)
		}
	}
	const resetInputs = () => {
		setInputValue('')
		setInputValue2('')
		setLockDuration(0)
	}
	const getLockBonus = () => {
		const lockBonus = longerPaysBetterBonusPercents[lockDuration - 1]
		if (!lockBonus) return 0
		return lockBonus
	}
	const switchTab = (val) => {
		setActiveTab(val)
		resetInputs()
	}

	/// API Calls
	const getMyPiggyBank = async () => {
		try {
			const res = await fetchPiggyBankData(account)
			setPiggyBank(res)
		} catch (err) {
			toastError('Error fetching PiggyBank')
			console.error(err)
		}
	}
	const approve = async () => {
		// setPending(true)
		try {
			await approvePiggyBankForPigBusdLP(LARGE_NUMBER, signer)
			setAllowance(LARGE_NUMBER)
			// setPending(false)
			setIsApproved(true)
			await getMyPiggyBank()
		} catch (err) {
			// setPending(false)
			setIsApproved(false)
		}
	}
	const _buyPiglets = async () => {
		if (!account) {
			toastInfo('Wallet has to be connected to buy Piglets.')
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
			const res = await buyPigLets(getDecimalAmount(amountFormatter(inputValue)), lockDuration.toString(), ref, signer)

			if (res.success === true) {
				resetInputs()
				dispatch(toggleConfirmModal(false))
				dispatch(toggleModalBackDrop(false))
				dispatch(toggleToastNotification({ state: true, msg: 'Transaction Succesful' }))
				await getMyPiggyBank()
				setTimeout(() => {
					dispatch(toggleToastNotification({ state: false, msg: '' }))
				}, 3000)
			}

			if (res.success === false) {
				dispatch(toggleToastNotification({ state: true, msg: 'Transaction Failed. Try again' }))
				setTimeout(() => {
					dispatch(toggleToastNotification({ state: false, msg: '' }))
				}, 3000)
			}
		} catch (err) {
			console.error(err)
		}
	}
	const _gitfPiglets = async () => {
		try {
			const res = await giftPiglet(inputValue2, getDecimalAmount(amountFormatter(inputValue)), lockDuration.toString(), signer)

			if (res.success === true) {
				resetInputs()
				dispatch(toggleToastNotification({ state: true, msg: 'Transaction Succesful' }))
				dispatch(toggleConfirmModal(false))
				dispatch(toggleModalBackDrop(false))
				await getMyPiggyBank()
				setTimeout(() => {
					dispatch(toggleToastNotification({ state: false, msg: '' }))
				}, 3000)
			}

			if (res.success === false) {
				dispatch(toggleToastNotification({ state: true, msg: 'Transaction Failed. Try again' }))
			}
		} catch (err) {
			console.error(err)
		}
	}

	/// Data Props
	const modalDetails = {
		modalTitleText: 'Confirm Deposit',
		confirmButtonText: 'Acknowledge',
		value: inputValue,
		text: 'PIGS/BUSD LP',
		warning: 'Deposit into PiggyBank',
		infoValues: [
			{
				title: 'Time Lock Duration',
				value: `${lockDuration} weeks`,
			},
			{
				title: 'Lock Bonus',
				value: `${getLockBonus()}%`,
			},
		],
		confirmFunction: _buyPiglets,
	}
	const giftModalDetails = {
		modalTitleText: 'Confirm Gifting',
		confirmButtonText: 'Acknowledge',
		value: inputValue,
		text: 'PIGS/BUSD LP',
		warning: `Are you sure you want to gift a PiggyBank stake ?`,
		infoValues: [
			{
				title: 'Time Lock Duration',
				value: `${lockDuration} weeks`,
			},
			{
				title: 'Lock Bonus',
				value: `${getLockBonus()}%`,
			},
		],
		confirmFunction: _gitfPiglets,
	}

	const _compoundAllStakes = async () => {
		if (userPiglets.length === 0) {
			toastInfo('Nothing to Compound')
			return
		}
		let errorCount = 0
		for (let i = 0; i <= userPiglets.length; i++) {
			const canDeposit = Math.floor(Date.now() / 1000) - userPiglets[i].lastCompounded > 86400
			/* eslint-disable no-continue */
			if (!canDeposit) continue
			try {
				/* eslint-disable no-await-in-loop */
				const res = await compoundAllStakes(userPiglets[i].ID, signer)

				// Handle Error
				if (res.success === false) {
					errorCount++
					console.error(res.message)
				}
			} catch (err) {
				console.error(err)
				errorCount++
			}
		}

		if (errorCount === 0) {
			toastSuccess('Stakes successfully compounded')
		} else {
			toastSuccess(`${errorCount} stakes failed to compound out of ${userPiglets.length} stakes`)
		}
	}

	return (
		<animated.div style={props}>
			<div className={styles.piggybank}>
				<div className={styles.cards}>
					<div>
						<PigsCreditCard title='Total LP Locked in PiggyBank' amount={new BigNumber(piggybank.balance).toFormat(2)} />
					</div>
				</div>
				<div className={styles.credit__wrap}>
					<div className={styles.tabs}>
						<div onClick={() => switchTab(1)} className={activeTab === 1 ? `${styles.tab__one} ${styles.tab__one__active}` : `${styles.tab__one}`}>
							<p>Buy Piglets</p>
						</div>
						<div onClick={() => switchTab(2)} className={activeTab === 2 ? `${styles.tab__two} ${styles.tab__two__active}` : `${styles.tab__two}`}>
							<p>Gift Piglets</p>
						</div>
					</div>
					{activeTab === 1 ? (
						<RewardsCenter
							mainButtonDisabled={shouldDisableMainButton()}
							approveButtonVisible={showApproveButton()}
							title='Buy Piglets with LP token'
							Lock
							pair={false}
							infoTitle='PIGS/BUSD LP balance'
							infoValue={`${amountFormatter(piggybank.userData.lpBalance)} PIGS/BUSD`}
							rewardCenter={false}
							token='PIGS/BUSD LP'
							icon={pig}
							warningMsg={false}
							sliderRequired
							isApproved={isApproved}
							lockDuration={lockDuration}
							setLockDuration={setLockDuration}
							confirmModalProps={modalDetails}
							checkButtonAndApproval={checkButtonAndApproval}
							buttonText='Buy Piglets'
							inputValue={inputValue}
							setInputValue={setInputValue}
							hideApproveButton={false}
							isButtonEnabled={isDisabled}
							approve={approve}
							pigBal={false}
							slippage={false}
							autoFillBusd={false}
							autoFillLP
						/>
					) : (
						<RewardsCenter
							mainButtonDisabled={shouldDisableMainButton()}
							approveButtonVisible={showApproveButton()}
							pair={false}
							Lock
							title='Gift Piglets with LP token'
							infoTitle='PIGS/BUSD LP balance'
							infoValue={`${amountFormatter(piggybank.userData.lpBalance)} PIGS/BUSD`}
							token='PIGS/BUSD LP'
							icon={pig}
							buttonText='Gift Piglets'
							recipient
							rewardCenter={false}
							warningMsg={false}
							sliderRequired
							lockDuration={lockDuration}
							setLockDuration={setLockDuration}
							inputValue2={inputValue2}
							setInputValue2={setInputValue2}
							approve={approve}
							isApproved={isApproved}
							checkButtonAndApproval={checkButtonAndApproval}
							isButtonEnabled={isDisabled}
							hideApproveButton={false}
							inputValue={inputValue}
							setInputValue={setInputValue}
							confirmModalProps={giftModalDetails}
							pigBal={false}
							slippage={false}
							autoFillBusd={false}
							autoFillLP
						/>
					)}
				</div>
				{account ? (
					<div className={styles.btn__wrap}>
						<button type='button' className={styles.btn} onClick={copyRefLink}>
							Copy Referral Link
						</button>
					</div>
				) : (
					''
				)}
				{account ? (
					<div className={styles.btn__wrap}>
						<button onClick={() => _compoundAllStakes()} type='button' className={styles.btn}>
							Compound All Stakes
						</button>
					</div>
				) : (
					''
				)}

				<PiggyBankTable />
				<ReferralTable />
				<PiggyBankInfo />
			</div>
		</animated.div>
	)
}

export default PiggyBank
