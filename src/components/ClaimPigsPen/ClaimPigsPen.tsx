import React from 'react'
import styles from './ClaimPigsPen.module.scss'
import logo from '../../assets/svgg.png'

function ClaimPigsPen() {
  return (
    <div className={styles.claimpigs}>
		
		<p className={styles.header} >Enter amount of pigs to be deposited to the pigs pen.</p>
		<form action="">
			<div className={styles.inputWrap}>
				<div className={styles.inputBox} >
					<div className={styles.logo}>
						<img src={logo} alt="" />
						<p>PIGS</p>
					</div>
					<input type="number" placeholder='000' />
				</div>
				<div>
					<p className={styles.claimable} >Amount Claimable: 376 PIGS</p>
				</div>
			</div>
			<button type='button' >Enter amount to claim</button>
		</form>
    </div>
  )
}

export default ClaimPigsPen