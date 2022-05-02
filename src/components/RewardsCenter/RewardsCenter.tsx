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

<<<<<<< HEAD
	sliderRequired?: boolean
=======
	sliderRequired: boolean
>>>>>>> c919bd8 (changed styles)
	title?: string
	Lock?: boolean
	pair?:boolean
	pigsBusdPrice?:number
	text?:string
	busdValue?:number,
	setBusdValue?:any
<<<<<<< HEAD
	isButtonEnabled?:boolean
=======
	isButtonEnabled:boolean
>>>>>>> c919bd8 (changed styles)
	approve?:any
	pending?:any
	isApproved?:boolean
	lockDuration?:any
<<<<<<< HEAD
	setLockDuration?:any
	available?:string
	infoTitle?:string
	infoValue?:any
	infoTitle2?:string
	infoValue2 ?: any
	infoTitle3?:string
	infoValue3 ?: any
	token?:string
	icon?:any
	pTitle?:any
	buttonText?:any
	recipient?:boolean
	rewardCenter?:boolean
=======
	setLockDuration:any
	available?:string
	infoTitle?:string
	infoValue?:any
	infoTitle2:string
	infoValue2 ?: number
	token?:string
>>>>>>> c919bd8 (changed styles)
	_confirmFunction?: () => void
	
}

<<<<<<< HEAD
function RewardsCenter({ sliderRequired, title, Lock, pair, pigsBusdPrice,text,busdValue, setBusdValue,pTitle, isButtonEnabled,isApproved, approve, pending, lockDuration, setLockDuration, _confirmFunction, available, infoTitle, infoTitle2, infoValue, infoValue2, infoValue3, infoTitle3, token, icon, buttonText, recipient, rewardCenter }: rewardProps) {
=======
function RewardsCenter({ sliderRequired, title, Lock, pair, pigsBusdPrice,text,busdValue, setBusdValue, isButtonEnabled,isApproved, approve, pending, lockDuration, setLockDuration, _confirmFunction, available, infoTitle, infoTitle2, infoValue, infoValue2, token }: rewardProps) {
>>>>>>> c919bd8 (changed styles)

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
			<p className={styles.header}>{pTitle}</p>
			<div className={styles.reward__claim}>
				<Info title={infoTitle} info={infoValue} />
				{ infoTitle2 &&  <Info title={infoTitle2} info={infoValue2} /> }
<<<<<<< HEAD
				{ infoTitle3 &&  <Info title={infoTitle3} info={infoValue3} /> }
=======
>>>>>>> c919bd8 (changed styles)

			</div>
			<form action=''>
				<div className={styles.inputWrap}>
					<div className={styles.inputBox}>
						<div className={styles.logo}>
<<<<<<< HEAD
							<img src={icon} alt='' />
=======
							<img src={logo} alt='' />
>>>>>>> c919bd8 (changed styles)
							<p>{token}</p>
						</div>
						<input  onChange={(e) => handleChange(e)} value={busdValue} type='number' placeholder='000' />
						
					</div>
					{ recipient && <div className={styles.inputBox2} >
						<input  placeholder='Input recipients address' />
					</div>}
					<div>
<<<<<<< HEAD
						{/* <p className={styles.claimable}>Availble : {available}</p> */}
					</div> 
=======
						<p className={styles.claimable}>Availble : {available}</p>
					</div>
>>>>>>> c919bd8 (changed styles)
				</div>
			</form>
			{pair && (
				<p className={styles.xpigs}>
					<span>{(busdValue / pigsBusdPrice).toFixed(3)} PIGS</span> will be paired with <span>{busdValue} BUSD</span>
				</p>
			)}
			{Lock && <p className={styles.lock}>Lock Duration <span>(Optional)</span></p>}
			{sliderRequired && <RangeSlider setLockDuration={setLockDuration} color='#121212' />}
<<<<<<< HEAD
			{Lock && <p className={styles.timelock} >Timelock Bonus <span>{getLockBonus()}%</span></p>}
			{/* {	
=======
			<p className={styles.timelock} >Timelock Bonus <span>{getLockBonus()}%</span></p>
			{	
>>>>>>> c919bd8 (changed styles)
				(!isApproved) ?
				<button type='button' disabled={!isButtonEnabled } className={!isButtonEnabled ? styles.button__disabled : styles.button__enabled}  onClick={()=>approve()} >{ pending ? "Pending" : "Approve" }</button> 
				:
				<button type='button' onClick={() => openModal()} className={styles.button__enabled}>claim</button>
			} */}
			<button type='button'  className={styles.button__disabled}>{buttonText}</button>
			{ rewardCenter && <div className={styles.center} >
				<p className={styles.center__header} >Reward Center</p>
				<div className={styles.center__box} >
					<Info title="Claimable BUSD" info="X BUSD" />
					<Info title="Claimable PIGS" info="X PIGS" />
				</div>
				<div className={styles.center__buttons}>
					<button type='button' style={{marginRight:"10px"}}>Claim reward</button>
					<button type='button' style={{marginLeft:"10px"}}>Compound PIGS</button>
				</div>
			</div>}
		</animated.div>
	)
}

export default RewardsCenter
