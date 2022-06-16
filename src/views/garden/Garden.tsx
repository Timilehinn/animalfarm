import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'

import Info from 'components/Info/Info'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'

import styles from './Garden.module.scss'
import pigs from '../../assets/svgg.png'
import busd from '../../assets/bbusd.png'
import drip from '../../assets/drip.png'

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
    const [isMenuOpen,setIsMenuOpen] = useState(false)
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
					{/* input 2 */}
					<button type='button' className={styles.button__disabled}>
						Deposit
					</button>
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
			</div>
		</div>
	)
}

export default Garden
