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
import { getDecimalAmount } from 'utils/formatBalance'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import BigNumber from 'bignumber.js'
import { usePiggyBank } from 'state/piggybank/hooks'
import { approvePiggyBankForPigBusdLP } from 'api/allowance'
import { useParams } from 'react-router-dom'

import { longerPaysBetterBonusPercents } from 'utils/lockBonusPercentage'
import useToast from 'hooks/useToast'
import styles from './PiggyBank.module.scss'
import pig from '../../assets/svgg.png'

import { PiggyBankAddress, LARGE_NUMBER, ZERO_ADDRESS } from '../../config/constants'
import { buyPigLets, giftPiglet } from '../../api/piggyBank/getMyPiggyBanks'

interface ParamsType {
	referee: string
}

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
	const [pending, setPending] = useState(false)
	const [isApproved, setIsApproved] = useState(false)
	const [isDisabled, setIsDisabled] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [inputValue2, setInputValue2] = useState('')

	const { toastInfo, toastError } = useToast()

	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })

	const copyRefLink = () => {
		if (navigator.clipboard && navigator.permissions) {
			navigator.clipboard.writeText(`${window.location.origin}/piggy-bank/${account}`).then(() => {
				// ..
				dispatch(toggleToastNotification({ state: true, msg: 'Copied Success!' }))
				setTimeout(() => {
					dispatch(toggleToastNotification(false))
				}, 3000)
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
			dispatch(toggleTourModal(data))
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
			console.log(res)
		} catch (err) {
			toastError('Error fetching PiggyBank')
			console.log(err)
		}
	}
	const approve = async () => {
		setPending(true)
		try {
			await approvePiggyBankForPigBusdLP(LARGE_NUMBER, signer)
			setAllowance(LARGE_NUMBER)
			setPending(false)
			setIsApproved(true)
			await getMyPiggyBank()
		} catch (err) {
			setPending(false)
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
			const res = await buyPigLets((Number(inputValue) * 10 ** 18).toString(), lockDuration.toString(), ref, signer)

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
			console.log(err)
		}
	}
	const _gitfPiglets = async () => {
		try {
			const res = await giftPiglet(inputValue2, (Number(inputValue) * 10 ** 18).toString(), lockDuration.toString(), signer)

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
			console.log(err)
		}
	}

	/// Data Props
	const modalDetails = {
		modalTitleText: 'Confirm Deposit',
		confirmButtonText: 'Acknowledge',
		value: inputValue,
		text: 'PIGS/BUSD LP',
		warning: 'A note text here',
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
		modalTitleText: 'Confirm Buy',
		confirmButtonText: 'Acknowledge',
		value: inputValue,
		text: 'PIGS',
		warning: 'Deposit into PigPen',
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

	return (
		<animated.div style={props}>
			<div className={styles.piggybank}>
				<div className={styles.piggybank__header}>
					{/* <p>
						THE PIGGY BANK IS THE FIRST EVER NON-INFLATIONARY VARIABLE TIME STAKING ANNUITY. LEARN MORE:
						<a href={`${window.location.origin}/docs/Animal_Farm_Rebirth_-_Migration__White_Paper_002.pdf#%5B%7B%22num%22%3A29%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22FitH%22%7D%2C733.179%5D`} className={styles.header__a}>
							{' '}
							HERE{' '}
						</a>
					</p> */}
				</div>
				<div className={styles.cards}>
					<div>
						<PigsCreditCard title='Total LP Locked' amount={piggybank.balance} />
					</div>
					{/* <div> 
						<PigsCreditCard title='Total Value LP Locked'  amount="$234,868"  />
					</div> */}
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
							infoValue={`${piggybank.userData.lpBalance} PIGS/BUSD`}
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
						/>
					) : (
						<RewardsCenter
							mainButtonDisabled={shouldDisableMainButton()}
							approveButtonVisible={showApproveButton()}
							pair={false}
							Lock
							title='Gift Piglets with LP token'
							infoTitle='PIGS/BUSD LP balance'
							infoValue={`${piggybank.userData.lpBalance} PIGS/BUSD`}
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

				<PiggyBankTable />
				<ReferralTable />
				<PiggyBankInfo />
			</div>
		</animated.div>
	)
}

export default PiggyBank
