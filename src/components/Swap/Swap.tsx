import React, { useState } from 'react'
import Info from 'components/Info/Info'
import styles from './Swap.module.scss'
import dog from '../../assets/dogg.png'
import pig from '../../assets/busd.png'
import coree from '../../assets/core.png'
import swap from '../../assets/swap.png'
import arrow from '../../assets/arrow-down.png'

interface farmProps {
	pair: string
	core: string
}

function Swap() {
	const tokens = [
		{
			name: 'PIG',
			icon: pig,
		},
		{
			name: 'DOG',
			icon: pig,
		},
	]
	return (
		<div className={styles.farm}>
			<div className={styles.inputBox}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className={styles.logo}>
						<img src={dog} alt='' />
						<p>PIGS</p>
						<img id={styles.dropdown} src={arrow} alt='' />
					</div>
					<input min='0' required type='number' placeholder='0.0' />
				</div>
				<div className={styles.box}>
					{tokens.map((item, index) => (
						<div className={styles.box__item}>
                            <img src={item.icon} alt="" />
                            <p style={{color:"white"}}> {item.name}</p>
                        </div>
					))}
				</div>
			</div>
			<div className={styles.swapIcon}>
				<img src={swap} alt='' />
			</div>

			<div className={styles.inputBox}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className={styles.logo}>
						<img src={dog} alt='' />
						<p>BUSD</p>
					</div>
					<input min='0' required type='number' placeholder='0.0' />
				</div>
			</div>
			{/* buttons */}
			<div className={styles.buttons}>
				<button type='button'>Enter Amount</button>
			</div>
		</div>
	)
}

export default Swap
