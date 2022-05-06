import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { longerPaysBetterBonusPercents } from 'utils/lockBonusPercentage'
import { ToggleWalletModal } from 'state/wallet'
import { ClaimToPiggyBank } from 'api/claimPigs'
import { usePigPen } from 'state/pigpen/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import RangeSlider from 'components/RangeSlider/RangeSlider'
import Info from 'components/Info/Info'
import { getBalanceAmountString } from 'utils/formatBalance'
import logo from '../../assets/svgg.png'
import Preloader from '../prealoder/preloader'
import styles from './RewardsCenter.module.scss'
import { toggleConfirmModal, toggleModalBackDrop, setModalProps } from '../../state/toggle'

interface rewardProps {
	sliderRequired?: boolean
	title?: string
	Lock?: boolean
	pair?: boolean
	pigsBusdPrice?: number
	text?: string
	// from piggybank input
	// pigsBusd?:string
	isButtonEnabled?: boolean
	approve?: () => void
	pending?: any
	isApproved?: boolean
	lockDuration?: any
	setLockDuration?: any
	available?: string
	infoTitle?: string
	infoValue?: any
	infoTitle2?: string
	infoValue2?: any
	infoTitle3?: string
	infoValue3?: any
	token?: string
	icon?: any
	pTitle?: any
	buttonText?: any
	recipient?: boolean
	rewardCenter?: boolean
	warningMsg?: boolean
	confirmFunction?: () => void
	confirmModalProps?: any
	checkButtonAndApproval?: (inputValue: string) => void
	hideAmountInput?: boolean
	hideApproveButton?: boolean
	inputValue?: string
	setInputValue?: any
	inputValue2?: string
	setInputValue2?: any
	claimRewards?: any
	compoundPigs?: any
}

function RewardsCenter({
	sliderRequired,
	title,
	Lock,
	pair,
	pigsBusdPrice,
	text,
	pTitle,
	isButtonEnabled,
	isApproved,
	approve,
	pending,
	lockDuration,
	setLockDuration,
	confirmFunction,
	confirmModalProps,
	available,
	infoTitle,
	infoTitle2,
	infoValue,
	infoValue2,
	infoValue3,
	infoTitle3,
	token,
	icon,
	buttonText,
	recipient,
	rewardCenter,
	warningMsg,
	checkButtonAndApproval,
	hideAmountInput,
	hideApproveButton,
	inputValue,
	setInputValue,
	inputValue2,
	setInputValue2,
	claimRewards,
	compoundPigs,
}: rewardProps) {
	const props = useSpring({ to: { opacity: 1, x: 0 }, from: { opacity: 0, x: 20 }, delay: 100 })
	const dispatch = useAppDispatch()
	const { userData, pigPenData } = usePigPen()

	const { account, library } = useActiveWeb3React()

	const handleChange = (e: any) => {
		setInputValue(e.target.value)
		checkButtonAndApproval(e.target.value)
	}

	const handleChange2 = (e: any) => {
		setInputValue2(e.target.value)
	}

	const handleApprove = () => {
		approve()
	}

	const getLockBonus = () => {
		return longerPaysBetterBonusPercents[lockDuration - 1]
	}

	const handleConfirm = async () => {
		confirmFunction()
	}

	const handleClaimReward = async () => {
		claimRewards()
	}

	const handleCompound = async () => {
		compoundPigs()
	}

	const shouldEnableClaimButton = (): boolean => {
		if (userData.earningsBusd === '0' && userData.earningsPigs === '0') {
			return false
		}

		if (userData.earningsBusd !== '0' || userData.earningsPigs !== '0') {
			return true
		}
		return true
	}

	const openModal = () => {
		if (confirmModalProps) {
			dispatch(toggleConfirmModal(true))
			dispatch(toggleModalBackDrop(true))
			dispatch(setModalProps(confirmModalProps))
		}
	}

	return (
		<animated.div style={props} className={styles.reward}>
			<h3>{title}</h3>
			<p className={styles.header}>{pTitle}</p>
			<div className={styles.reward__claim}>
				<Info title={infoTitle} info={infoValue} />
				{infoTitle2 && <Info title={infoTitle2} info={infoValue2} />}
				{infoTitle3 && <Info title={infoTitle3} info={infoValue3} />}
			</div>
			<form action=''>
				<div hidden={hideAmountInput} className={styles.inputWrap}>
					<div className={styles.inputBox}>
						<div className={styles.logo}>
							<img src={icon} alt='' />
							<p>{token}</p>
						</div>
						<input onChange={(e) => handleChange(e)} min='0' required value={inputValue} type='number' placeholder='0.00' />
					</div>
					{recipient && (
						<div className={styles.inputBox2}>
							<input onChange={(e) => handleChange2(e)} value={inputValue2} placeholder='Input recipients address' />
						</div>
					)}
					<div>{/* <p className={styles.claimable}>Availble : {available}</p> */}</div>
				</div>
			</form>
			{pair && (
				<p className={styles.xpigs}>
					<span>{(Number(inputValue) / pigsBusdPrice).toFixed(3)} PIGS</span> will be paired with <span>{inputValue} BUSD</span>
				</p>
			)}
			{Lock && (
				<p className={styles.lock}>
					Lock Duration <span>(Optional)</span>
				</p>
			)}
			{sliderRequired && <RangeSlider setLockDuration={setLockDuration} color='#121212' />}
			{Lock && (
				<p className={styles.timelock}>
					Timelock Bonus <span>{getLockBonus()}%</span>
				</p>
			)}
			{!isApproved && !hideApproveButton ? (
				<button type='button' disabled={!isButtonEnabled} className={!isButtonEnabled ? `${styles.button__disabled} ${styles.pending}` : styles.button__enabled} onClick={handleApprove}>
					{pending ? <Preloader /> : 'Approve'}
				</button>
			) : ""}
			{isApproved && <button type='button'   onClick={() => openModal()} className={isApproved && isButtonEnabled ? `${styles.button__enabled}` : `${styles.button__disabled}  ${styles.button__disabled}` }  >
				{buttonText}
			</button>}
			{/* <button type='button' className={styles.button__disabled}>
				{buttonText}
			</button> */}
			{warningMsg && <p className={styles.warning}>NOTE: You’ll be able to withdraw 2% of your staked PIGS once every 24 hours</p>}
			{rewardCenter && (
				<div className={styles.center}>
					<p className={styles.center__header}>Reward Center</p>
					<div className={styles.center__box}>
						<Info title='Claimable BUSD' info={`${getBalanceAmountString(userData.earningsBusd)} BUSD`} />
						<Info title='Claimable PIGS' info={`${getBalanceAmountString(userData.earningsBusd)} PIGS`} />
					</div>
					<div className={styles.center__buttons}>
						<button type='button' onClick={handleClaimReward} style={{ marginRight: '10px' }} disabled={shouldEnableClaimButton()} className={styles.button__enabled}>
							Claim Rewards
						</button>
						<button type='button' onClick={handleCompound} style={{ marginLeft: '10px' }} className={styles.button__enabled}>
							Compound PIGS
						</button>
					</div>
				</div>
			)}
		</animated.div>
	)
}

export default RewardsCenter
