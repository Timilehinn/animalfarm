import React,{useState} from 'react'
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

	sliderRequired: boolean
	title?: string
	Lock?: boolean
	pair?:boolean
	pigsBusdPrice?:number
	text?:string
	busdValue?:number,
	setBusdValue?:any
	isButtonEnabled:boolean
	approve?:any
	pending?:any
	isApproved?:boolean
	lockDuration?:any
	setLockDuration:any
	available?:string
	infoTitle?:string
	infoValue?:any
	infoTitle2:string
	infoValue2 ?: number
	token?:string
	_confirmFunction?: () => void
	
}

function RewardsCenter({ sliderRequired, title, Lock, pair, pigsBusdPrice,text,busdValue, setBusdValue, isButtonEnabled,isApproved, approve, pending, lockDuration, setLockDuration, _confirmFunction, available, infoTitle, infoTitle2, infoValue, infoValue2, token }: rewardProps) {

	const props = useSpring({ to: { opacity: 1, x: 0 }, from: { opacity: 0, x: 20 }, delay: 100 })
	const dispatch = useAppDispatch()
	
	const { account,library } = useActiveWeb3React()

	const [value, setValue] = React.useState(0)
	
	// const { library  } = useActiveWeb3React()
	const signer = library.getSigner()

	const handleChange = (e: any) => {
		setBusdValue(e.target.value)
		console.log(busdValue * 10**8);
	}

	const getLockBonus = () =>{
		return longerPaysBetterBonusPercents[lockDuration - 1 ]
	}


	const confirmFunction = async() =>{
		_confirmFunction()
	}


	// modal properties to be set to state
	const confirmModalProps = {
		value:50,
		text,
		warning : "Wwarning set",
		infoValues : [
			{title:"Pigs deposited",value:Math.ceil(busdValue / pigsBusdPrice)},
			{title:"BUSD deposited",value:busdValue},
			{title:"Time Lock",value:`${longerPaysBetterBonusPercents[lockDuration - 1 ]}%`},
			{title:"1 PIGS(s)",value:pigsBusdPrice},
			{title:"1 BUSD",value:1/pigsBusdPrice}
		],
	confirmFunction 
		
	}

	const openModal = () => {
		dispatch(toggleConfirmModal(true))
		dispatch(toggleModalBackDrop(true))
		dispatch(setModalProps(confirmModalProps))
	}


	
	

	console.log(lockDuration)

	// const estimatedBusdToPair = Math.ceil(pigsBusdPrice * availablePigsToClaim)

	const buttonDisabled = busdValue < 1

	return (
		<animated.div style={props} className={styles.reward}>
			<h3>{title}</h3>
			<p className={styles.header}>Enter amount of BUSD to be paired with Pigs</p>
			<div className={styles.reward__claim}>
				<Info title={infoTitle} info={infoValue} />
				{ infoTitle2 &&  <Info title={infoTitle2} info={infoValue2} /> }

			</div>
			<form action=''>
				<div className={styles.inputWrap}>
					<div className={styles.inputBox}>
						<div className={styles.logo}>
							<img src={logo} alt='' />
							<p>{token}</p>
						</div>
						<input  onChange={(e) => handleChange(e)} value={busdValue} type='number' placeholder='000' />
					</div>
					<div>
						<p className={styles.claimable}>Availble : {available}</p>
					</div>
				</div>
			</form>
			{pair && (
				<p className={styles.xpigs}>
					<span>{(busdValue / pigsBusdPrice).toFixed(3)} PIGS</span> will be paired with <span>{busdValue} BUSD</span>
				</p>
			)}
			{Lock && <p className={styles.lock}>Lock Duration <span>(Optional)</span></p>}
			{sliderRequired && <RangeSlider setLockDuration={setLockDuration} color='#121212' />}
			<p className={styles.timelock} >Timelock Bonus <span>{getLockBonus()}%</span></p>
			{	
				(!isApproved) ?
				<button type='button' disabled={!isButtonEnabled } className={!isButtonEnabled ? styles.button__disabled : styles.button__enabled}  onClick={()=>approve()} >{ pending ? "Pending" : "Approve" }</button> 
				:
				<button type='button' onClick={() => openModal()} className={styles.button__enabled}>claim</button>
			}
			{/* { !canApprove &&
				<button  disabled={buttonDisabled} className={isButtonEnabled ? styles.button__enabled : styles.button__disabled} type='button'>
					Enter amount 
				</button> 
			}
			{	pending ? 
				<button  onClick={()=>approve()} className={styles.button__enabled} >{ pending ? "Pending" : "Approve"}</button> : 
				<button onClick={() => openModal()} className={styles.button__enabled} >Continue</button> 
				
			} */}
		</animated.div>
	)
}

export default RewardsCenter
