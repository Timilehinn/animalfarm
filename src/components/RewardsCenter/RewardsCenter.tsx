import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { longerPaysBetterBonusPercents } from 'utils/lockBonusPercentage'
// import { ToggleWalletModal } from 'state/wallet'
// import { ClaimToPiggyBank } from 'api/claimPigs'
import { usePigPen } from 'state/pigpen/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import RangeSlider from 'components/RangeSlider/RangeSlider'
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton'
import Info from 'components/Info/Info'
import { getBalanceAmountString } from 'utils/formatBalance'
import Preloader from '../prealoder/preloader'
import styles from './RewardsCenter.module.scss'
import { toggleConfirmModal, toggleModalBackDrop, setModalProps } from '../../state/toggle'

interface rewardProps {
	mainButtonDisabled?: boolean
	approveButtonVisible?: boolean
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
	claimButton?: boolean
	compoundButton?: boolean
	pigBal?: boolean
	slippage?: boolean
	tolerance?: string
	setTolerance?: any
}

function RewardsCenter({
	mainButtonDisabled,
	approveButtonVisible,
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
	claimButton,
	compoundButton,
	pigBal,
	slippage,
	tolerance,
	setTolerance,
}: rewardProps) {
	const props = useSpring({ to: { opacity: 1, x: 0 }, from: { opacity: 0, x: 20 }, delay: 100 })
	const dispatch = useAppDispatch()
	const { account } = useActiveWeb3React()
	const { userData } = usePigPen()
	const pigBalance = useAppSelector((state) => state.pricingReducer.data.pigsBalance)

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

	const handleClaimReward = async () => {
		claimRewards()
	}

	const handleCompound = async () => {
		compoundPigs()
	}

	const handleChangeSlippage = (e: any) => {
		_setTolerance(e.target.value)
	}

	// const shouldEnableClaimButton = (): boolean => {
	// 	if (userData.earningsBusd === '0' && userData.earningsPigs === '0') {
	// 		return false
	// 	}

	// 	if (userData.earningsBusd !== '0' || userData.earningsPigs !== '0') {
	// 		return true
	// 	}
	// 	return true
	// }

	const openModal = () => {
		if (confirmModalProps) {
			dispatch(toggleConfirmModal(true))
			dispatch(toggleModalBackDrop(true))
			dispatch(setModalProps(confirmModalProps))
		}
	}

	const _setTolerance = (val) => {
		if (Number(val) <= 100) {
			setTolerance(val)
		}
	}

	const rewards = useAppSelector((state) => state.pigPenReducer.userData)

	const isCompoundButtonDisabled = Number(rewards.earningsPigs) === 0
	const isClaimButtonDisabled = Number(rewards.earningsBusd) === 0 && Number(rewards.earningsPigs) === 0

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
						{pigBal && (
							<p role='presentation' onClick={() => setInputValue((Number(pigBalance) / 10 ** 18).toFixed(3))} className={styles.bal}>
								Wallet balance: {(Number(pigBalance) / 10 ** 18).toFixed(3)}
							</p>
						)}
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div className={styles.logo}>
								<img src={icon} alt='' />
								<p>{token}</p>
							</div>
							<input onChange={(e) => handleChange(e)} min='0' required value={inputValue} type='number' placeholder='0.0' />
						</div>
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
			{sliderRequired && <RangeSlider lockDuration={lockDuration} setLockDuration={setLockDuration} color='#121212' />}
			{Lock && (
				<p className={styles.timelock}>
					Timelock Bonus <span>{getLockBonus()}%</span>
				</p>
			)}
			{/* Start Handle Connect Wallet */}
			{!account ? (
				<ConnectWalletButton />
			) : (
				<button onClick={() => openModal()} type='button' disabled={mainButtonDisabled} className={!mainButtonDisabled ? `${styles.button__enabled}` : `${styles.button__disabled}`}>
					{buttonText}
				</button>
			)}
			{/* End Handle Connect Wallet */}
			{account && !hideApproveButton ? (
				approveButtonVisible ? (
					<button onClick={handleApprove} type='button' className={pending ? `${styles.button__disabled} ${styles.pending}` : styles.button__enabled}>
						{pending ? <Preloader /> : 'Approve'}
					</button>
				) : (
					''
				)
			) : (
				''
			)}
			{/* <button type='button' className={styles.button__disabled}>
				{buttonText}
			</button> */}
			{warningMsg && <p className={styles.warning}>NOTE: You’ll be able to withdraw 2% of your staked PIGS once every 24 hours</p>}
			{rewardCenter && (
				<div className={styles.center}>
					<p className={styles.center__header}>Reward Center</p>
					<div className={styles.center__box}>
						<Info title='Claimable BUSD' info={`${getBalanceAmountString(userData.earningsBusd)} BUSD`} />
						<Info title='Claimable PIGS' info={`${getBalanceAmountString(userData.earningsPigs)} PIGS`} />
					</div>
					<div className={styles.center__buttons}>
						{claimButton && (
							<button onClick={handleClaimReward} type='button' style={{ marginRight: '10px' }} disabled={isClaimButtonDisabled} className={isClaimButtonDisabled ? `${styles.button__disabled}` : styles.reward__button__enabled}>
								Claim Rewards
							</button>
						)}
						{compoundButton && (
							<button onClick={handleCompound} disabled={isCompoundButtonDisabled} className={isCompoundButtonDisabled ? `${styles.button__disabled}` : styles.reward__button__enabled} type='button' style={{ marginLeft: '10px' }}>
								Compound PIGS (Claim BUSD)
							</button>
						)}
					</div>
				</div>
			)}
			{slippage && (
				<div className={styles.slippage}>
					<p>Slippage settings</p>
					<div className={styles.slippage__buttons}>
						<button className={Number(tolerance) === 1 ? `${styles.active}` : ''} type='button' onClick={() => _setTolerance(1)}>
							1%
						</button>
						<button className={Number(tolerance) === 5 ? `${styles.active}` : ''} type='button' onClick={() => _setTolerance(5)}>
							5%
						</button>
						<button className={Number(tolerance) === 10 ? `${styles.active}` : ''} type='button' onClick={() => _setTolerance(10)}>
							10%
						</button>
						<input
							className={Number(tolerance) !== 1 && Number(tolerance) !== 5 && Number(tolerance) !== 10 ? `${styles.active}` : ''}
							onChange={(e) => handleChangeSlippage(e)}
							min='0'
							max='100'
							required
							value={tolerance}
							type='number'
							placeholder='0.0'
						/>
					</div>
					<div className={styles.tolerance}>
						<p>Slippage tolerance</p>
						<p className={styles.price}>{tolerance}%</p>
					</div>
				</div>
			)}
		</animated.div>
	)
}

export default RewardsCenter
