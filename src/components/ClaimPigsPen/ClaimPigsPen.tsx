/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { getBalanceAmountString } from 'utils/formatBalance'
import styles from './ClaimPigsPen.module.scss'
import logo from '../../assets/svgg.png'

interface claimProps {
	title: string
	pigsAvailableToClaim: string
	claimToPigPenAmount: string
	setClaimToPigPenAmount: any
	claimToPigPen: any
}

function ClaimPigsPen({ title, pigsAvailableToClaim, claimToPigPenAmount, setClaimToPigPenAmount, claimToPigPen }: claimProps) {
	const styleProps = useSpring({ to: { opacity: 1, x: 0 }, from: { opacity: 0, x: -20 }, delay: 100 })

	const handleChange = (e: any) => {
		setClaimToPigPenAmount(e.target.value)
	}

	const handleClick = () => {
		claimToPigPen()
	}

	const buttonDisabled = claimToPigPenAmount === '0'

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
						<input value={claimToPigPenAmount} onChange={(e) => handleChange(e)} type='number' placeholder='0.00' />
					</div>
					<div>
						<p className={styles.claimable}>Amount Claimable: {getBalanceAmountString(pigsAvailableToClaim)} PIGS</p>
					</div>
				</div>
				<button onClick={handleClick} disabled={buttonDisabled} className={buttonDisabled ? styles.button__disabled : styles.button__enabled} type='button'>
					claim
				</button>
			</form>
		</animated.div>
	)
}

export default ClaimPigsPen
