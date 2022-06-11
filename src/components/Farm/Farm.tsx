import React from 'react'
import Info from 'components/Info/Info'
import styles from './Farm.module.scss'
import dog from '../../assets/dogg.png'
import pig from '../../assets/busd.png'
import coree from '../../assets/core.png'


interface farmProps{
    pair : string 
    core:string
}

function Farm({pair,core}:farmProps) {
	return (
		<div className={styles.farm}>
			<header>
				<div className={styles.tokens}>
					<div className={styles.tokens__icons}>
						<img src={dog} alt='' />
						<img className={styles.img__two} src={pig} alt='' />
					</div>
					<div className={styles.token__names}>
						<p>{pair}</p>
					</div>
				</div>
				<div className={styles.core}>
					<div className={styles.core__button}>
						<img src={coree} alt='' />
						<p>{core}</p>
					</div>
					<div className={styles.core__circle}>
						<p>6x</p>
					</div>
				</div>
			</header>
			<div className={styles.staked}>
				<p>
					<span>DOGS/BUSD LP staked:</span> 5,534
				</p>
				<button type='button'>Unstake</button>
			</div>
			<div className={styles.staked}>
				<p>
					<span>PIGS earned:</span> 5,534
				</p>
				<button type='button'>Claim</button>
			</div>
			<div className={styles.infoArea}>
				<Info title='Apr' info='12,4444' />
				<Info title='Earned' info='12,4444' />
				<Info title='Reward Lockup' info='$1200000' />
			</div>
			{/* input */}
			<div className={styles.inputBox}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className={styles.logo}>
						<img src={dog} alt='' />
						<p>{pair} LP</p>
					</div>
					<input min='0' required type='number' placeholder='0.0' />
				</div>
			</div>
			{/* buttons */}
			<div className={styles.buttons}>
				<button  type='button'>Enter Amount</button>
			</div>
			<div className={styles.bottom__info}>
				<div className={styles.bottom__info__liquidity}>
					<p>Total liquidity</p>
					<p>$12,222222</p>
				</div>
				<div className={styles.bottom__info__tokens}>
					<p>Get DOGS/BUSD</p>
                    <p>View contract</p>
                    <p>See pair info</p>
				</div>
			</div>
		</div>
	)
}

export default Farm
