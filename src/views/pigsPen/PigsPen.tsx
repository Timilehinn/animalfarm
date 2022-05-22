import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useSpring, animated } from 'react-spring'
import { toggleModalBackDrop, toggleConfirmModal, toggleTourModal } from 'state/toggle'
// eslint-disable-next-line import/no-named-as-default-member
import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { usePigPen } from 'state/pigpen/hooks'
import useToast from 'hooks/useToast'
import { getBalanceAmountString, getDecimalAmount, amountFormatter } from 'utils/formatBalance'

import { fetchPigPenData, approvePigPenSpendPIGS, depositIntoPigPen, claimRewardPigPen, withdrawFromPigPen } from 'api/pigpen'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styles from './PigsPen.module.scss'

import pig from '../../assets/svgg.png'

function PigsPen() {
	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(${window.location.origin}/bg/pigpen.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		)
	}, [])

	const { account, library } = useActiveWeb3React()
	const signer = library.getSigner()
	const { userData, pigPenData, setPigPenData, setUserData } = usePigPen()
	const [activeTab, setActiveTab] = React.useState(1)
	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })
	const dispatch = useAppDispatch()
	const { toastSuccess, toastError, toastInfo } = useToast()

	// State for button
	const [depositButtonText, setDepositButtonText] = useState('Deposit')

	/// Generic States to be used for all pages that requires approval
	const [pending, setPending] = useState(false)
	const [isApproved, setIsApproved] = useState(false)
	// const [allowance, setAllowance] = useState(0)
	const [isDisabled, setIsDisabled] = useState(false)
	const pigsBusdPrice = useAppSelector((state) => state.pricingReducer.pigsBusdPrice)
	/// State for input
	const [inputValue, setInputValue] = useState('')

	// const [isSwitchActive, setIsSwitchActive] = useState(false)
	// const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	// open tour modal
	useEffect(() => {
		dispatch(toggleTourModal({ state: false, msg: '' }))
		const data = {
			state: true,
			msg: 'The PIGPEN is our staking protocol where holders of the PIGS token become owners of the platform by staking their PIGS. Pigpen pays out high yield dividends in both BUSD and PIGS that are generated from the platform fees and DOGs token taxes!!',
		}
		setTimeout(() => {
			const pigPenInfo = localStorage.getItem('pigPenInfo')

			if (!pigPenInfo) {
				dispatch(toggleTourModal(data))
				localStorage.setItem('pigPenInfo', 'pigPenInfo')
			}
		}, 4000)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function fetchData() {
		const res = await fetchPigPenData(account)
		setPigPenData(res.pigPenData)
		setUserData(res.userData)
	}

	useEffect(() => {
		if (account) {
			fetchData()
		} else {
			toastInfo('Connect your wallet to see PigPen stats')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

	/// Start Generic functions for pages that needs approval ///
	const shouldDisableMainButton = (): boolean => {
		if (!inputValue || (inputValue === '0' && !isApproved)) {
			return true
		}

		if (new BigNumber(userData.allowance).isLessThan(getDecimalAmount(inputValue))) {
			return true
		}
		return false
	}

	const showApproveButton = (): boolean => {
		if (!inputValue || (inputValue === '0' && isApproved)) {
			return false
		}
		if (new BigNumber(userData.allowance).isLessThan(getDecimalAmount(inputValue))) {
			return true
		}
		return false
	}

	const checkButtonAndApproval = (inputvalue: string) => {
		if (new BigNumber(userData.allowance).isLessThan(getDecimalAmount(inputvalue))) {
			setIsDisabled(true)
			setIsApproved(false)
		}

		if (new BigNumber(userData.allowance).isGreaterThanOrEqualTo(getDecimalAmount(inputvalue)) && inputvalue !== null) {
			setIsDisabled(false)
			setIsApproved(true)
		}
	}

	const approve = async () => {
		setPending(true)
		try {
			await approvePigPenSpendPIGS(signer)
			await fetchData()
			setPending(false)
			setIsApproved(true)
		} catch (err) {
			setPending(false)
			setIsApproved(false)
		}
	}
	/// End Generic functions for pages that needs approval ///

	const depositPigs = async () => {
		if (!inputValue) return
		// setPending(true)
		try {
			// compound if autoCompound is on.
			// const isAutoCompoundActive = localStorage.getItem('autoCompound')
			if (new BigNumber(userData.earningsBusd).isGreaterThan(0) || new BigNumber(userData.earningsPigs).isGreaterThan(0)) {
				setDepositButtonText('Claiming...')
				toastInfo('Claiming pending rewards!')
				await claimRewardPigPen(true, signer)
			}
			setDepositButtonText('Depositing...')
			await depositIntoPigPen(getDecimalAmount(amountFormatter(inputValue)), signer)
			await fetchData()
			setInputValue('')
			setDepositButtonText('Deposit')
			toastSuccess('Deposit Successful!')

			dispatch(toggleConfirmModal(false))
			dispatch(toggleModalBackDrop(false))
		} catch (err) {
			setDepositButtonText('Deposit')
		}
	}

	const claimMyRewards = async () => {
		// TODO: Make a pending state for compounding and claiming rewards button
		if (!account) {
			toastInfo('Wallet has to be connected to claim rewards.')
			return
		}

		try {
			const res = await claimRewardPigPen(false, signer)

			if (res.success === true) {
				await fetchData()
				toastSuccess(res.message)
				dispatch(toggleConfirmModal(false))
				dispatch(toggleModalBackDrop(false))
			}

			if (res.success === false) {
				toastError(res.message)
			}
		} catch (err) {
			console.error(err)
		}
	}

	const compoundPigs = async () => {
		if (!account) {
			toastInfo('Wallet has to be connected to compound rewards.')
			return
		}
		try {
			const res = await claimRewardPigPen(true, signer)

			if (res.success === true) {
				await fetchData()
				toastSuccess(res.message)
				dispatch(toggleConfirmModal(false))
				dispatch(toggleModalBackDrop(false))
			}

			if (res.success === false) {
				toastError(res.message)
			}
		} catch (err) {
			console.error(err)
		}
	}

	const withdrawPigs = async () => {
		setPending(true)

		try {
			const res = await withdrawFromPigPen(signer)

			setPending(false)
			if (res.success === true) {
				await fetchData()
				toastSuccess(res.message)
				dispatch(toggleConfirmModal(false))
				dispatch(toggleModalBackDrop(false))
			}

			if (res.success === false) {
				toastError(res.message)
			}
		} catch (err) {
			console.error(err)
		}
	}
	// check if startLockTimestamp is greater than 24 hours
	const isWithdrawalEnabled = Math.floor(Date.now() / 1000) - Number(userData.startLockTimestamp) > 86400

	const modalDetailsForDeposit = {
		modalTitleText: 'Confirm Deposit',
		confirmButtonText: 'Deposit',
		value: new BigNumber(inputValue).toFormat(2),
		text: 'PIGS',
		warning: 'Deposit into PigPen',
		infoValues: [
			{
				title: 'Rewards',
				value: 'BUSD & PIGS',
			},
		],
		confirmFunction: depositPigs,
	}

	const modalDetailsForWithdraw = {
		modalTitleText: 'Confirm Withdrawal',
		confirmButtonText: 'Withdraw',
		value: new BigNumber(getBalanceAmountString(userData.pigAvailableForWithdrawal)).toFormat(2),
		text: 'PIGS',
		warning: 'Withdraw from PigPen',
		infoValues: [
			{
				title: 'PIGS remaining',
				value: `${amountFormatter(getBalanceAmountString((Number(userData.stakedBalance) - Number(userData.pigAvailableForWithdrawal)).toString()))}`,
			},
			{
				title: '1 PIG(s)',
				value: amountFormatter(pigsBusdPrice.toString()),
			},
		],
		confirmFunction: withdrawPigs,
	}

	// const getTimeleft = (timestamp) => {
	// 	if (timestamp === '0') return `0d : 0h : 0m`

	// 	const today = Date.now()
	// 	const lockDuration = Number(timestamp * 1000) + Number(pigPenData.maxLockUpDuration) * 1000
	// 	const diffMs = lockDuration - today // milliseconds between now & lock duration
	// 	const diffDays = Math.floor(diffMs / 86400000) // days
	// 	const diffHrs = Math.floor((diffMs % 86400000) / 3600000) // hours
	// 	const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000) // minutes
	// 	return `${diffDays}d : ${diffHrs}h : ${diffMins}m`
	// }

	// const handleAutoCompound = () => {
	// 	const isAutoCompoundActive = localStorage.getItem('autoCompound')

	// 	if (!isAutoCompoundActive) {
	// 		localStorage.setItem('autoCompound', 'autoCompound')
	// 		setIsSwitchActive(true)
	// 	} else {
	// 		localStorage.removeItem('autoCompound')
	// 		setIsSwitchActive(false)
	// 	}
	// }

	// useEffect(() => {
	// 	const isAutoCompoundActive = localStorage.getItem('autoCompound')

	// 	if (isAutoCompoundActive) {
	// 		setIsSwitchActive(true)
	// 	}
	// }, [])

	return (
		<animated.div style={props} className={styles.pigspen__wrap}>
			<div className={styles.pigspen}>
				{!account && (
					<p style={{ fontSize: '.8em', marginBottom: '8px' }}>
						<i>Connect your wallet to see stats</i>
					</p>
				)}
				<div className={styles.cards}>
					<div>
						<PigsCreditCard title='Total PIGS Locked' amount={`${new BigNumber(getBalanceAmountString(pigPenData.pigsSupply)).toFormat(2)} PIGS`} />
					</div>
					<div>
						<PigsCreditCard
							title='PigPen Total Value Locked'
							amount={`$ ${new BigNumber(getBalanceAmountString((Number(pigPenData.pigsSupply) * Number(pigsBusdPrice) + Number(pigPenData.busdRewards) + Number(pigPenData.pigsRewards) * Number(pigsBusdPrice)).toString())).toFormat(
								2
							)}`}
						/>
					</div>
					<div>
						<PigsCreditCard title='BUSD in Rewards Vault' amount={`$ ${new BigNumber(getBalanceAmountString(pigPenData.busdRewards)).toFormat(2)} BUSD`} />
					</div>
					<div>
						<PigsCreditCard title='PIGS in Rewards Vault' amount={`${new BigNumber(getBalanceAmountString(pigPenData.pigsRewards)).toFormat(2)} PIGS`} />
					</div>
				</div>
				<div className={styles.credit__wrap}>
					<div className={styles.credit__wrap__in}>
						{/* <div className={styles.settings}>
							<Icon onClick={() => setIsSettingsOpen(!isSettingsOpen)} icon='ci:settings-filled' />
							<div onClick={() => handleAutoCompound()} className={isSettingsOpen ? `${styles.settings__box} ${styles.settings__box__active}` : `${styles.settings__box}`}>
								<p>Auto Compound</p>
								<div className={styles.switch}>
									<div className={isSwitchActive ? `${styles.switch__button__active} ${styles.switch__button}` : `${styles.switch__button}`}>{}</div>
								</div>
							</div>
						</div> */}
						<div className={styles.tabs}>
							<div onClick={() => setActiveTab(1)} className={activeTab === 1 ? `${styles.tab__one} ${styles.tab__one__active}` : `${styles.tab__one}`}>
								<p>Deposit PIGS</p>
							</div>
							<div onClick={() => setActiveTab(2)} className={activeTab === 2 ? `${styles.tab__two} ${styles.tab__two__active}` : `${styles.tab__two}`}>
								<p>Withdraw PIGS</p>
							</div>
						</div>
						{activeTab === 1 ? (
							<RewardsCenter
								mainButtonDisabled={shouldDisableMainButton()}
								approveButtonVisible={showApproveButton()}
								sliderRequired={false}
								title='Submit PIGS to be deposited'
								infoTitle='Staked Balance'
								infoValue={`${new BigNumber(getBalanceAmountString(userData.stakedBalance)).toFormat(2)} PIGS`}
								infoValue2='2% per day'
								infoTitle2='Withdrawal Limit'
								// infoTitle3='Total Liquidity'
								// infoValue3='$0.00'
								icon={pig}
								pTitle='Enter amount of PIGS to be staked in the PIG Pen, to earn PIGS and BUSD dividends.'
								token='PIGS'
								buttonText={depositButtonText}
								Lock={false}
								rewardCenter
								warningMsg
								// Input related props
								inputValue={inputValue}
								setInputValue={setInputValue}
								// Approval-related props
								pending={pending}
								isApproved={isApproved}
								isButtonEnabled={isDisabled}
								checkButtonAndApproval={checkButtonAndApproval}
								approve={approve}
								// Confirm Props for Confirm Modal
								confirmModalProps={modalDetailsForDeposit}
								// Rewards
								claimRewards={claimMyRewards}
								compoundPigs={compoundPigs}
								claimButton={false}
								compoundButton
								pigBal
								slippage={false}
								autoFillBusd={false}
							/>
						) : (
							<RewardsCenter
								mainButtonDisabled={!isWithdrawalEnabled}
								sliderRequired={false}
								title='Withdraw your staked PIGS'
								infoValue2='2% per day'
								infoTitle='PIGS staked'
								infoValue={`${new BigNumber(getBalanceAmountString(userData.stakedBalance)).toFormat(2)} PIGS`}
								infoTitle2='Withdraw limit'
								infoTitle3='Available PIGS to withdraw'
								infoValue3={`${new BigNumber(getBalanceAmountString(userData.pigAvailableForWithdrawal)).toFormat(2)} PIGS`}
								// infoTitle4='Time left to stake unlock'
								// infoValue4={getTimeleft(userData.startLockTimestamp)}
								token='PIGS'
								hideAmountInput
								hideApproveButton
								icon={pig}
								Lock={false}
								buttonText='Withdraw PIGS'
								pTitle='Enter amount of PIGS to be withdrawn from the PIG Pen'
								rewardCenter
								warningMsg={false}
								// Confirm Props for Confirm Modal
								confirmModalProps={modalDetailsForWithdraw}
								// Approval for button
								isApproved
								pending={pending}
								claimButton
								claimRewards={claimMyRewards}
								compoundButton={false}
								pigBal={false}
								slippage={false}
								autoFillBusd={false}
							/>
						)}
					</div>
				</div>
			</div>
		</animated.div>
	)
}

export default PigsPen
