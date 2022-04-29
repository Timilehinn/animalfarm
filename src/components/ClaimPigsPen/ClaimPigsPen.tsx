import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './ClaimPigsPen.module.scss'
import logo from '../../assets/svgg.png'

interface claimProps {
	title: string
}

function ClaimPigsPen({ title }: claimProps) {
	const styleProps = useSpring({ to: { opacity: 'auto', x: 0 }, from: { opacity: 'auto', x: -20 }, delay: 100 }) // TODO: Look into the correct props. For some reasons, it is saying opacity is not compatible

	const [value, setValue] = useState('')

	const handleChange = (e: any) => {
		setValue(e.target.value)
	}

	const buttonDisabled = value === ''

	return (
		<animated.div style={styleProps} className={styles.claimpigs}>
			<h3>{title}</h3>
			<p className={styles.header}>Enter amount of pigs to be deposited to the pigs pen.</p>
			<form action=''>
				<div className={styles.inputWrap}>
					<div className={styles.inputBox}>
						<div className={styles.logo}>
							<img src={logo} alt='' />
							<p>PIGS</p>
						</div>
						<input onChange={(e) => handleChange(e)} type='number' placeholder='000' />
					</div>
					<div>
						<p className={styles.claimable}>Amount Claimable: 376 PIGS</p>
					</div>
				</div>
				<button onClick={() => alert('Hello')} disabled={buttonDisabled} className={buttonDisabled ? styles.button__disabled : styles.button__enabled} type='button'>
					Enter amount to claim
				</button>
			</form>
		</animated.div>
	)
}

export default ClaimPigsPen
