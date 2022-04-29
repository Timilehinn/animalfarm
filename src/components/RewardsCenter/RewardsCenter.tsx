import React from 'react'
import { useSpring, animated } from 'react-spring'
import RangeSlider from 'components/RangeSlider/RangeSlider'
import styles from './RewardsCenter.module.scss'
import logo from '../../assets/svgg.png'

interface rewardProps {
	sliderRequired: boolean
	title: string
	xLock: boolean
}

function RewardsCenter({ sliderRequired, title, xLock }: rewardProps) {
	const props = useSpring({ to: { opacity: 1, x: 0 }, from: { opacity: 0, x: 20 }, delay: 100 })

	const [value, setValue] = React.useState('')

	const handleChange = (e: any) => {
		setValue(e.target.value)
	}

	const buttonDisabled = value === ''

	return (
		<animated.div style={props} className={styles.reward}>
			<h3>{title}</h3>
			<p className={styles.header}>Input amount of BUSD to be paired with Pigs</p>
			<div className={styles.reward__claim}>
				<div style={{ marginBottom: '10px' }} className={styles.reward__claim__box}>
					<p>Eran</p>
					<p>BUSD</p>
				</div>
				<div style={{ marginBottom: '10px' }} className={styles.reward__claim__box}>
					<p>Lockup durarion</p>
					<p>50 days</p>
				</div>
				<div className={styles.reward__claim__box}>
					<p>Total Liquididy</p>
					<p>$1,3000,3445</p>
				</div>
			</div>
			<form action=''>
				<div className={styles.inputWrap}>
					<div className={styles.inputBox}>
						<div className={styles.logo}>
							<img src={logo} alt='' />
							<p>PIGS</p>
						</div>
						<input onChange={(e) => handleChange(e)} value={value} type='number' placeholder='000' />
					</div>
					<div>
						<p className={styles.claimable}>Amount Claimable: 376 PIGS</p>
					</div>
				</div>
			</form>
			{xLock && (
				<p className={styles.xpigs}>
					<span>X PIGS</span> will be paired with <span>XBUSD</span>
				</p>
			)}
			{xLock && <p className={styles.lock}>Lock Duration (Optional)</p>}
			{sliderRequired && <RangeSlider color='#121212' opacity={3} />}
			<button onClick={() => alert('Hello')} disabled={buttonDisabled} className={buttonDisabled ? styles.button__disabled : styles.button__enabled} type='button'>
				Enter amount to claim
			</button>
		</animated.div>
	)
}

export default RewardsCenter
