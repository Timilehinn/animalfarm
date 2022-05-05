import React, { useState,useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { longerPaysBetterBonusPercents } from 'utils/lockBonusPercentage'
import { ToggleWalletModal } from 'state/wallet'
import { ClaimToPiggyBank } from 'api/claimPigs'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import RangeSlider from 'components/RangeSlider/RangeSlider'
import Info from 'components/Info/Info'
import logo from '../../assets/svgg.png'

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
}: rewardProps) {
	const props = useSpring({ to: { opacity: 1, x: 0 }, from: { opacity: 0, x: 20 }, delay: 100 })
	const dispatch = useAppDispatch()

	const { account, library } = useActiveWeb3React()

	

	const handleChange = (e: any) => {
		// setBusdValue(e.target.value)
		setInputValue(e.target.value)
		checkButtonAndApproval(e.target.value)
	}

	const handleChange2 = (e: any) => {
		// setBusdValue(e.target.value)
		setInputValue2(e.target.value)
		
	}

	const handleApprove = () => {
		// setBusdValue(e.target.value)
		approve()
	}

	const getLockBonus = () => {
		return longerPaysBetterBonusPercents[lockDuration - 1]
	}

	const handleConfirm = async () => {
		confirmFunction()
	}

	// modal properties to be set to state
	// const confirmModalProps = {
	// 	value: 50,
	// 	text,
	// 	warning: 'Wwarning set',
	// 	infoValues: [
	// 		{ title: 'Pigs deposited', value: Math.ceil(Number(busdValue) / pigsBusdPrice) },
	// 		{ title: 'BUSD deposited', value: busdValue },
	// 		{ title: 'Time Lock', value: `${longerPaysBetterBonusPercents[lockDuration - 1]}%` },
	// 		{ title: '1 PIGS(s)', value: pigsBusdPrice },
	// 		{ title: '1 BUSD', value: 1 / pigsBusdPrice },
	// 	],
	// 	confirmFunction,
	// }

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
						<input onChange={(e) => handleChange(e)} min="0" required value={inputValue} type='number' placeholder='0.00' />
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
				<button type='button' disabled={!isButtonEnabled} className={!isButtonEnabled ? styles.button__disabled : styles.button__enabled} onClick={handleApprove}>
					{pending ? 'Pending' : 'Approve'}
				</button>
			) : (
				<button type='button' disabled={!isApproved} onClick={() => openModal()} className={styles.button__enabled}>
					{buttonText}
				</button>
			)}
			{/* <button type='button' className={styles.button__disabled}>
				{buttonText}
			</button> */}
			{warningMsg && <p className={styles.warning}>NOTE: You’ll be able to withdraw 2% of your staked PIGS once every 24 hours</p>}
			{rewardCenter && (
				<div className={styles.center}>
					<p className={styles.center__header}>Reward Center</p>
					<div className={styles.center__box}>
						<Info title='Claimable BUSD' info='0 BUSD' />
						<Info title='Claimable PIGS' info='0 PIGS' />
					</div>
					<div className={styles.center__buttons}>
						<button type='button' style={{ marginRight: '10px' }}>
							Claim reward
						</button>
						<button type='button' style={{ marginLeft: '10px' }}>
							Compound PIGS
						</button>
					</div>
				</div>
			)}
		</animated.div>
	)
}

export default RewardsCenter
