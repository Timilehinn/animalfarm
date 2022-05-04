/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'
import PiggyBankTable from 'components/PiggyBankTable/PiggyBankTable'
import ReferralTable from 'components/ReferralTable/ReferralTable'
import PiggyBankInfo from 'components/PiggyBankInfo/PiggyBankInfo'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { toggleToastNotification, toggleTourModal } from 'state/toggle'
// import { getMyPiggyBanks } from 'api/piggyBank/getMyPiggyBanks'
import { fetchPiggyBankData } from 'api/Ipiggybank'
import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { usePiggyBank } from 'state/piggybank/hooks'
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
	const { piggybank, isInitialized, isLoading, setFetchFailed, setFetchStart, setPiggyBank } = usePiggyBank()
	// const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState(1)
	const [lockDuration, setLockDuration] = useState(0)
	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })

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

	useEffect(() => {
		dispatch(toggleTourModal({ state: false, msg: '' }))
		const data = {
			state: true,
			msg: 'The piggy bank is the first ever non-inflatory variable time staking annuity. Stake PIGS/BUSD LP tokens to earn up to 3% daily ROI!! Earn a 20% refferal bonus for on boarding new users.',
		}
		setTimeout(() => {
			dispatch(toggleTourModal(data))
		}, 3000)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getMyPiggyBank = async () => {
		try {
			setFetchStart()
			const res = await fetchPiggyBankData(account)
			console.log(res)
			setPiggyBank(res.data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getMyPiggyBank()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	/** The usePiggyBank hook. This is used to only set data.
	 * piggybank - This returns ALL the piggybank related data you need
	 * isLoading - is true when fetcing the data
	 */

	return (
		<animated.div style={props}>
			<div className={styles.piggybank}>
				<div className={styles.piggybank__header}>
					{/* <p>
						THE PIGGY BANK IS THE FIRST EVER NON-INFLATIONARY VARIABLE TIME STAKING ANNUITY. LEARN MORE:
						<a href={`${window.location.origin}/docs/Animal_Farm_Rebirth_-_Migration__White_Paper_002.pdf#%5B%7B%22num%22%3A29%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22FitH%22%7D%2C733.179%5D`} className={styles.header__a}>
							{' '}
							HERE{' '}
						</a>
					</p> */}
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
		</animated.div>
	)
}

export default PiggyBank
