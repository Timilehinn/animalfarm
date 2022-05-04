/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'
import PiggyBankTable from 'components/PiggyBankTable/PiggyBankTable'
import ReferralTable from 'components/ReferralTable/ReferralTable'
import PiggyBankInfo from 'components/PiggyBankInfo/PiggyBankInfo'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useNavigate } from 'react-router-dom'

import { toggleToastNotification } from 'state/toggle'

import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import styles from './PiggyBank.module.scss'
import pig from '../../assets/svgg.png'

function PiggyBank() {
	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(./bg/piggybank.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		)
	}, [])

	const pigsBusdLpBalance = useAppSelector((state) => state.balanceReducer.pigsBusdLpBalance)
	const { account } = useActiveWeb3React()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState(1)
	const [lockDuration, setLockDuration] = useState(0)

	const copyRefLink = () => {
		if (navigator.clipboard && navigator.permissions) {
			navigator.clipboard.writeText(`${window.location.origin}/piggy-bank/${account}`).then(() => {
				// ..
				dispatch(toggleToastNotification({ state: true, msg: 'Copied Success!' }))
				setTimeout(() => {
					dispatch(toggleToastNotification(false))
				}, 3000)
			})
		} else if (document.queryCommandSupported('copy')) {
			const ele = document.createElement('textarea')
			ele.value = account
			document.body.appendChild(ele)
			ele.select()
			document.execCommand('copy')
			document.body.removeChild(ele)
		}
	}

	return (
		<div>
			<div className={styles.piggybank}>
				<div className={styles.piggybank__header}>
					<p>
						THE PIGGY BANK IS THE FIRST EVER NON-INFLATIONARY VARIABLE TIME STAKING ANNUITY. LEARN MORE:
						<a href='https://animal-farm-v2.netlify.app/docs/Animal_Farm_Rebirth_-_Migration__White_Paper_002.pdf#%5B%7B%22num%22%3A29%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22FitH%22%7D%2C733.179%5D' className={styles.header__a}>
							{' '}
							HERE{' '}
						</a>
					</p>
				</div>
				<div className={styles.cards}>
					<div>
						<PigsCreditCard title='Total LP Locked' amount='0.00 PIGS/BUSD' />
					</div>
					{/* <div> 
						<PigsCreditCard title='Total Value LP Locked'  amount="$234,868"  />
					</div> */}
				</div>
				<div className={styles.credit__wrap}>
					<div className={styles.tabs}>
						<div onClick={() => setActiveTab(1)} className={activeTab === 1 ? `${styles.tab__one} ${styles.tab__one__active}` : `${styles.tab__one}`}>
							<p>Buy Piglets</p>
						</div>
						<div onClick={() => setActiveTab(2)} className={activeTab === 2 ? `${styles.tab__two} ${styles.tab__two__active}` : `${styles.tab__two}`}>
							<p>Gift Piglets</p>
						</div>
					</div>
					{activeTab === 1 ? (
						<RewardsCenter
							title='Buy Piglets with LP token'
							Lock
							pair={false}
							buttonText='Enter amount'
							infoValue={`${pigsBusdLpBalance} PIGS/BUSD`}
							infoTitle='PIGS/BUSD LP balance'
							rewardCenter={false}
							token='PIGS/BUSD LP'
							icon={pig}
							warningMsg={false}
							sliderRequired
							lockDuration={lockDuration}
							setLockDuration={setLockDuration}
						/>
					) : (
						<RewardsCenter
							pair={false}
							Lock
							title='Gift Piglets with LP token'
							infoValue={`${pigsBusdLpBalance} PIGS/BUSD`}
							infoTitle='PIGS/BUSD LP balance'
							token='PIGS/BUSD LP'
							icon={pig}
							buttonText='Enter amount'
							recipient
							rewardCenter={false}
							warningMsg={false}
							sliderRequired
							lockDuration={lockDuration}
							setLockDuration={setLockDuration}
						/>
					)}
				</div>
				<div className={styles.btn__wrap}>
					<button type='button' className={styles.btn} onClick={copyRefLink}>
						Copy referral link
					</button>
				</div>

				<PiggyBankTable />
				<ReferralTable />
				<PiggyBankInfo />
			</div>
		</div>
	)
}

export default PiggyBank
