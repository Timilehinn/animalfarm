import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'

import Info from 'components/Info/Info'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import Preloader from 'components/prealoder/preloader'
import styles from './DripLiberation.module.scss'
import pigs from '../../assets/svgg.png'
import busd from '../../assets/bbusd.png'
import drip from '../../assets/drip.png'
import garden from '../../assets/gardengraph.png'

function DripLiberation() {
	
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [showApprove, setShowApprove] = useState(false)
	const [pendingApproval, setPendingApprovel] = useState(false)
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)
	const [pending, setPending] = useState(false)
	const dripBusdBal = '10'

	const handleApprove = () => {
		return ''
	}

	const deposit = () => {
		return ''
	}

	return (
		<div className={styles.addliquidity__wrap}>
			<div className={styles.addliquidity}>
				<section>
					<header>Drip Liberation</header>
					<p className={styles.info}>Funds sent will be converted to DRIP/BUSD LP</p>
					<div className={styles.info__area}>
						<Info title='DRIP/BUSD LP balance' info='0' />
						<Info title='BUSD balance' info='0' />
					</div>
					{/* input 1 */}
					<div className={styles.inputBox}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.logo}>
								<img src={busd} alt='' />
								<p>BUSD</p>
							</div>
							<input min='0' required type='number' placeholder='0.0' />
						</div>
					</div>
					{/* buttons */}
					{showApprove &&
						(pendingApproval ? (
							<button type='button' className={styles.button__enabled}>
								<Preloader />
							</button>
						) : (
							<button onClick={handleApprove} type='button' className={styles.button__enabled}>
								Approve
							</button>
						))}
					{/* Swap Button */}
					{isButtonDisabled ? (
						<button type='button' className={styles.button__disabled}>
							{Number(dripBusdBal) === 0 ? `Insufficient DRIP/BUSD LP Balance` : 'Enter amount'}
						</button>
					) : pending ? (
						<button type='button' className={styles.button__enabled}>
							<Preloader />
						</button>
					) : (
						<button onClick={deposit} type='button' className={styles.button__enabled}>
							Deposit
						</button>
					)}
				</section>
			</div>
		</div>
	)
}

export default DripLiberation
