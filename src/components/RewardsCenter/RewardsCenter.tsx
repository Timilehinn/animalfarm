import React,{useState} from 'react'
import { useSpring, animated } from 'react-spring'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import { ToggleWalletModal } from 'state/wallet'
import RangeSlider from 'components/RangeSlider/RangeSlider'
import Info from 'components/Info/Info'
import confirmModal from 'components/ConfirmModal/ConfirmModal'
import logo from '../../assets/svgg.png'

import styles from './RewardsCenter.module.scss'
import { toggleConfirmModal, toggleModalBackDrop } from '../../state/toggle'

interface rewardProps {
	sliderRequired: boolean
	title: string
	Lock: boolean
	pair:boolean
	pigsBusdPrice:number
}

function RewardsCenter({ sliderRequired, title, Lock, pair, pigsBusdPrice }: rewardProps) {

	const props = useSpring({ to: { opacity: 1, x: 0 }, from: { opacity: 0, x: 20 }, delay: 100 })
	const dispatch = useAppDispatch()
	const availablePigsToClaim = useAppSelector((state)=>state.pigsCreditReducer.pigsAvailableToClaim)


	const [value, setValue] = React.useState(0)

	const handleChange = (e: any) => {
		setValue(e.target.value)
	}

	const openModal = () => {
		dispatch(toggleConfirmModal(true))
		dispatch(toggleModalBackDrop(true))

	}

	const estimatedBusdToPair = Math.ceil(pigsBusdPrice * availablePigsToClaim)

	const buttonDisabled = value < 1

	return (
		<animated.div style={props} className={styles.reward}>
			<h3>{title}</h3>
			<p className={styles.header}>Enter amount of BUSD to be paired with Pigs</p>
			<div className={styles.reward__claim}>
				<Info title="Available PIGS to claim" info={Math.ceil(availablePigsToClaim)} />
				<Info title="Estimated BUSD to pair" info={estimatedBusdToPair} />

			</div>
			<form action=''>
				<div className={styles.inputWrap}>
					<div className={styles.inputBox}>
						<div className={styles.logo}>
							<img src={logo} alt='' />
							<p>BUSD</p>
						</div>
						<input  onChange={(e) => handleChange(e)} value={value} type='number' placeholder='000' />
					</div>
					<div>
						<p className={styles.claimable}>Available BUSD: 0 BUSD</p>
					</div>
				</div>
			</form>
			{pair && (
				<p className={styles.xpigs}>
					<span>{Math.ceil(value / pigsBusdPrice)} PIGS</span> will be paired with <span>{value} BUSD</span>
				</p>
			)}
			{Lock && <p className={styles.lock}>Lock Duration (Optional)</p>}
			{sliderRequired && <RangeSlider color='#121212' opacity={3} />}
			<button onClick={() => openModal()} disabled={buttonDisabled} className={buttonDisabled ? styles.button__disabled : styles.button__enabled} type='button'>
				Enter amount 
			</button>
		</animated.div>
	)
}

export default RewardsCenter
