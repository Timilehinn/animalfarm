/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import PiggyBankTable from 'components/PiggyBankTable/PiggyBankTable'
import ReferralTable from 'components/ReferralTable/ReferralTable'
import PiggyBankInfo from 'components/PiggyBankInfo/PiggyBankInfo'

import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import styles from './PiggyBank.module.scss'


function PiggyBank() {

	const [activeTab, setActiveTab] = React.useState(1)
	const pigsBusdLpBalance = useAppSelector((state)=>state.balanceReducer.pigsBusdLpBalance)

	return (
		<div>
			<div className={styles.piggybank}>

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
							sliderRequired={false}
							title='Buy Piglets with LP token' 
							Lock 
							pair={false}
							
							infoValue={`${pigsBusdLpBalance}PIGS/BUSD`}
							infoTitle = "Your PIGS/BUSD LP balance"
						
							token="PIGS/BUSD LP"


						/> 
						: 
						<RewardsCenter 
							pair={false}
							sliderRequired
							title='Gift Piglets with LP token' 
						/>
					}
				</div>

				<PiggyBankTable />
				<ReferralTable />
				<PiggyBankInfo />
			</div>
		</div>
	)
}

export default PiggyBank
