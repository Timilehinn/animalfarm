import React, { useState } from 'react'
import Info from 'components/Info/Info'
import { useSpring, animated } from 'react-spring'
import styles from './Farm.module.scss'
import dog from '../../assets/dogg.png'
import pig from '../../assets/busd.png'
import coree from '../../assets/core.png'
import arrow from '../../assets/arrow-down.png'

interface farmProps {
	pair1?: any
	pair2: any
	core?: boolean
	multiplier?: number
	amountStaked?: number
	amountEarned?: number
	apr?: number
	rewardToken?: string
	totalLiquidity?: number

	id: number
	current: number
	setCurrent: any
	title?: string
}

function Farm({ pair1, pair2, title, multiplier, amountStaked, amountEarned, apr, totalLiquidity, rewardToken, core, id, current, setCurrent }: farmProps) {
	const props = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: 50 }, delay: 100 })

	return (
		<div className={styles.farm}>
			<header>
				<div className={styles.tokens}>
					<div className={styles.tokens__icons}>
						<img src={pair1} alt='' />
						<img className={styles.img__two} src={pair2} alt='' />
					</div>
					<div className={styles.token__names}>
						<p>{title}</p>
					</div>
				</div>
				<div className={styles.core}>
					<div className={styles.core__button}>
						<img src={coree} alt='' />
						<p>{core ? 'Core' : 'Non-core'}</p>
					</div>
					<div className={styles.core__circle}>
						<p>6x</p>
					</div>
				</div>
			</header>
			<div className={styles.staked}>
				<p>
					<span>DOGS/BUSD LP staked:</span> {0}
				</p>
				<button type='button'>Unstake</button>
			</div>
			<div className={styles.staked}>
				<p>
					<span>PIGS earned:</span> {0}
				</p>
				<button type='button'>Claim</button>
			</div>
			<div className={styles.infoArea}>
				<Info title='Apr' info={`${apr}%`} />
				<Info title='Earn' info={rewardToken} />
				<Info title='Total Liquidity' info={totalLiquidity} />
			</div>
			{/* input */}
			<div onClick={id === current ? () => setCurrent(null) : () => setCurrent(id)} className={styles.collapsible}>
				<p>Enter amount</p>
				<img src={arrow} alt='' />
			</div>
			{id === current && (
				<animated.div style={props} className={styles.collapseCover}>
					<div className={styles.inputBox}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div className={styles.logo}>
								<img src={dog} alt='' />
								<p>{title} LP</p>
							</div>
							<input min='0' required type='number' placeholder='0.0' />
						</div>
					</div>
					{/* buttons */}
					<div className={styles.buttons}>
						<button type='button'>Enter Amount</button>
					</div>
					{/* <div className={styles.bottom__info}>
						<div className={styles.bottom__info__liquidity}>
					<p>Total liquidity</p>
					<p>$12,222222</p>
					</div>
						<div className={styles.bottom__info__tokens}>
							<p>Get DOGS/BUSD</p>
							<p>View contract</p>
							<p>See pair info</p>
						</div>
					</div> */}
				</animated.div>
			)}
		</div>
	)
}

export default Farm
