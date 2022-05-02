/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import PiggyBankTable from 'components/PiggyBankTable/PiggyBankTable'
import ReferralTable from 'components/ReferralTable/ReferralTable'
import PiggyBankInfo from 'components/PiggyBankInfo/PiggyBankInfo'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useNavigate } from 'react-router-dom'

import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import styles from './PiggyBank.module.scss'
import pig from '../../assets/svgg.png'


function PiggyBank() {

	const [activeTab, setActiveTab] = React.useState(1)
	const pigsBusdLpBalance = useAppSelector((state)=>state.balanceReducer.pigsBusdLpBalance)
	const { account } = useActiveWeb3React()
	const navigate = useNavigate()
	


	return (
		<div>
			<div className={styles.piggybank}>
				<div className={styles.cards}>
					<div>
						<PigsCreditCard title="Total LP Locked" amount="25,000PIGS/BUSD" />
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
					{activeTab === 1 ? 
						<RewardsCenter 
							sliderRequired
							title='Buy Piglets with LP token' 
							Lock
							pair={false}
							buttonText = "Enter amount"
							infoValue={`${pigsBusdLpBalance}PIGS/BUSD`}
							infoTitle = "PIGS/BUSD LP balance"
							rewardCenter={false}
							token="PIGS/BUSD LP"
							icon={pig}


						/> 
						: 
						<RewardsCenter 
							pair={false}
							Lock 
							sliderRequired
							title='Gift Piglets with LP token' 
							infoValue={`${pigsBusdLpBalance}PIGS/BUSD`}
							infoTitle = "PIGS/BUSD LP balance"
							token="PIGS/BUSD LP"
							icon={pig}
							buttonText = "Enter amount"
							recipient
							rewardCenter={false}
						/>
					}
				</div>
				<div className={styles.btn__wrap} >
					<button  type='button' className={styles.btn} ><a style={{color:"white",textDecoration:"none"}} href={`http://doman.com/piggy-bank${account}/`} >Copy refferal link</a></button>
				</div>
				
				<PiggyBankTable />
				<ReferralTable />
				<PiggyBankInfo />
			</div>
		</div>
	)
}

export default PiggyBank
