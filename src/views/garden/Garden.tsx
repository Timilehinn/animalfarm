import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'

import Info from 'components/Info/Info'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import Preloader from 'components/prealoder/preloader'
import styles from './Garden.module.scss'
import pigs from '../../assets/svgg.png'
import busd from '../../assets/bbusd.png'
import drip from '../../assets/drip.png'
import garden from '../../assets/gardengraph.png'

function Garden() {
	const tokens = [
		{
			name: 'PIGS',
			icon: pigs,
		},
		{
			name: 'DOG',
			icon: pigs,
		},
		{
			name: 'BUSD',
			icon: busd,
		},
	]
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
				<div className={styles.cards}>
					<PigsCreditCard title='Total LP locked' amount='0 DRIP/BUSD' />

					<PigsCreditCard title='Total value of LP locked' amount='$0' />
				</div>

				<section>
					<header>Buy plants with LP tokens</header>
					{/* <p className={styles.info}>Enter the amount of BUSD to be paired with PIG</p> */}
					<div className={styles.info__area}>
						<div className={styles.bonus}>
							<div className={styles.bonus__in}>Ferterlizers bonus</div>
						</div>
						<Info title='Time' info='0' />
						<Info title='Balance' info='0' />
						<Info title='Total' info='0' />
					</div>
					{/* input 1 */}
					<div className={styles.inputBox}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.logo}>
								<img src={busd} alt='' />
								<img id={styles.drip} src={drip} alt='' />
								<p>DRIP/BUSD LP</p>
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
						
						<button onClick={deposit}  type='button' className={styles.button__enabled}>
							Deposit
						</button>
					)}
					<div className={styles.reward__center}>
						<p className={styles.reward__header}>Reward center</p>
						<div className={styles.info__area}>
							<Info title='Plants grown' info='0' />
							<Info title='Seeds available' info='0' />
						</div>
						<div className={styles.reward__center__buttons}>
							<button type='button' id={styles.button__one} className={styles.button__disabled}>
								Compound seed
							</button>
							<button type='button' id={styles.button__two} className={styles.button__disabled}>
								Sell seed
							</button>
						</div>
					</div>
				</section>
				<div className={styles.about}>
					<h3>About Drip Garden</h3>
					<p>
						The piggy bank is the first ever non-inflationary variable time staking annuity. Stake pigs/busd lp tokens to earn up to 3% daily roi!! to unlock referral bonuses you must have dogs staked in the single asset staking pool (see
						bottom of page). Time lock your harvest to earn a massive bonus on yield, airdrop stakes to friends and family using the gift stake function, most importantly take control of your financial future on the animal farm!!
					</p>
					<h3>Drip Garden Mechanism</h3>
					<p>
						As you can see, the DRIP Garden increases buying power over time and as the balance of the contract grows ensuring that you will always get a fair rate. There is still a benefit to getting in early because the earlier your
						plants get in the ground the larger you can grow your garden and out perform the competition. The time multiplier is designed to attract new waves capital after we have reached saturation and the contract growth has slowed due
						to the buying power of new capital creeping up by 0.1% non compounding every day. This means there will always be a time in the future where it makes sense for fresh capital to come in and kick start a new wave gardeners!
					</p>
					<img src={garden} alt='' />
				</div>
			</div>
		</div>
	)
}

export default Garden
