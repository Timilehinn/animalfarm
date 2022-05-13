import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useSpring, animated } from 'react-spring'
// import { toggleTourModal } from 'state/toggle'
import { toggleToastNotification, toggleModalBackDrop, toggleConfirmModal, toggleTourModal } from 'state/toggle'
import ClaimPigsPen from 'components/ClaimPigsPen/ClaimPigsPen'
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

	/// Generic States to be used for all pages that requires approval
	const [pending, setPending] = useState(false)
	const [isApproved, setIsApproved] = useState(false)
	const [allowance, setAllowance] = useState(0)
	const [isDisabled, setIsDisabled] = useState(false)
	const pigsBusdPrice = useAppSelector((state) => state.pricingReducer.pigsBusdPrice)
	/// State for input
	const [inputValue, setInputValue] = useState('')

	// open tour modal
	useEffect(() => {
		dispatch(toggleTourModal({ state: false, msg: '' }))
		const data = {
			state: true,
			msg: 'The PIGPEN is our staking protocol where holders of the PIGS token become owners of the platform by staking their PIGS. Pigpen pays out high yield dividends in both BUSD and PIGS that are generated from the platform fees and DOGs token taxes!!',
		}
		setTimeout(() => {
			dispatch(toggleTourModal(data))
			// setTimeout(()=>{
			// dispatch( toggleTourModal({state:false,msg:""}) )
			// },10000)
		}, 4000)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function fetchData() {
		const res = await fetchPigPenData(account)
		setPigPenData(res.pigPenData)
		setUserData(res.userData)
	}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (account) {
			fetchData()
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
		setPending(true)
		try {
			// await depositIntoPigPen(getDecimalAmount(amountFormatter(inputValue)), signer)
			await depositIntoPigPen(getDecimalAmount(inputValue), signer)
			await fetchData()
			setInputValue('')
			toastSuccess('Deposit Successful!')
			// dispatch(toggleToastNotification({ state: true, msg: 'Success' }))
			dispatch(toggleConfirmModal(false))
			dispatch(toggleModalBackDrop(false))

			// setTimeout(() => {
			// 	dispatch(toggleToastNotification(false))
			// }, 3000)
		} catch (err) {
			// Do something here
		}
	}

	const claimMyRewards = async () => {
		// setPending(true)
		if (!account) {
			toastInfo('Wallet has to be connected to claim rewards.')
			return
		}
		try {
			await claimRewardPigPen(false, signer)
			await fetchData()
			toastSuccess('Claim Rewards Successful!')
			// dispatch(toggleToastNotification({ state: true, msg: 'Success' }))
			dispatch(toggleConfirmModal(false))
			dispatch(toggleModalBackDrop(false))

			// setTimeout(() => {
			// 	dispatch(toggleToastNotification(false))
			// }, 3000)
		} catch (err) {
			// Do something here
		}
	}

	const compoundPigs = async () => {
		// setPending(true)
		if (!account) {
			toastInfo('Wallet has to be connected to compound rewards.')
			return
		}
		try {
			await claimRewardPigPen(true, signer)
			await fetchData()
			toastSuccess('Successful!')
			// dispatch(toggleToastNotification({ state: true, msg: 'Success' }))
			dispatch(toggleConfirmModal(false))
			dispatch(toggleModalBackDrop(false))

			// setTimeout(() => {
			// 	dispatch(toggleToastNotification(false))
			// }, 3000)
		} catch (err) {
			// Do something here
		}
	}

	const withdrawPigs = async () => {
		// require((block.timestamp - user.startLockTimestamp) >= 24 hours, "withdraw: Cannot withdraw until after 24 hours!");
		// setPending(true)

		try {
			await withdrawFromPigPen(signer)
			await fetchData()
			toastSuccess('Withdrawal Successful!')
			// dispatch(toggleToastNotification({ state: true, msg: 'Withdraw Successful' }))
			dispatch(toggleConfirmModal(false))
			dispatch(toggleModalBackDrop(false))

			// setTimeout(() => {
			// 	dispatch(toggleToastNotification(false))
			// }, 3000)
		} catch (err) {
			// Do something here
			toastError('Cannot withdraw until after 24 hours!')
		}
	}

	// withdrawFromPigPen

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

	return (
		<animated.div style={props} className={styles.pigspen__wrap}>
			<div className={styles.pigspen}>
				{/* <div className={styles.pigspen__header}>
					<p>
						THE PIGPEN IS OUR STAKING PROTOCOL WHERE HOLDERS OF THE PIGS TOKENS BECOME OWNERS OF THE PLATFORM! EARN HIGH YIELD DIVIDENDS IN PIGS AND BUSD. LEARN MORE:{' '}
						<a href={`${window.location.origin}/docs/Animal_Farm_Rebirth_-_Migration__White_Paper_002.pdf#%5B%7B%22num%22%3A29%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22FitH%22%7D%2C733.179%5D`} className={styles.header__a}>
							HERE{' '}
						</a>
					</p>
				</div> */}
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
								buttonText='Deposit'
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
							/>
						) : (
							<RewardsCenter
								sliderRequired={false}
								title='Withdraw your staked PIGS'
								infoValue2='2% per day'
								infoTitle='PIGS staked'
								infoValue={`${new BigNumber(getBalanceAmountString(userData.stakedBalance)).toFormat(2)} PIGS`}
								infoTitle2='Withdraw limit'
								infoTitle3='Available PIGS to withdraw'
								infoValue3={`${new BigNumber(getBalanceAmountString(userData.pigAvailableForWithdrawal)).toFormat(2)} PIGS`}
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
								claimButton
								claimRewards={claimMyRewards}
								compoundButton={false}
								pigBal={false}
								slippage={false}
							/>
						)}
					</div>
				</div>

				{/* absolute */}
				{/* <img className={styles.pig} src={pig} alt='' /> */}
			</div>
		</animated.div>
	)
}

export default PigsPen
