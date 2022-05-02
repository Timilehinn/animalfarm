import React from 'react'
import { useSpring, animated } from 'react-spring'

import ClaimPigsPen from 'components/ClaimPigsPen/ClaimPigsPen'
import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import styles from './PigsPen.module.scss'

import pig from '../../assets/svgg.png'

function PigsPen() {
	const [activeTab, setActiveTab] = React.useState(1)
	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })

	return (
		<div className={styles.pigspen__wrap} >
			<div className={styles.pigspen}>
				<div className={styles.cards}>
					<div>
						<PigsCreditCard title="PIGS balance" amount="50" />
					</div>
					<div>
						<PigsCreditCard title='BUSD balance'  amount="60"  />
					</div>
				</div>
				<div className={styles.credit__wrap}>
					<div className={styles.credit__wrap__in}>
						<div className={styles.tabs}>
							<div onClick={() => setActiveTab(1)} className={activeTab === 1 ? `${styles.tab__one} ${styles.tab__one__active}` : `${styles.tab__one}`}>
								<p>Deposit PIGS</p>
							</div>
							<div onClick={() => setActiveTab(2)} className={activeTab === 2 ? `${styles.tab__two} ${styles.tab__two__active}` : `${styles.tab__two}`}>
								<p>Withdraw PIGS</p>
							</div>
						</div>
						{activeTab === 1 ? 
							<RewardsCenter 
								sliderRequired={false} 
								title='Submit PIGS to be deposited'  
								infoTitle='Earn' 
								infoValue2="50 days"
								infoValue='BUSD'
								infoTitle2='Stake Lockup'
								infoTitle3='Total Liquidity'
								infoValue3='$1308,456,544'
								icon={pig}
								pTitle="Enter amount of PIGS to be staked in the PIG Pen"
								token='PIGS'
								buttonText = "Enter amount to deposit"
						/> :
						 <RewardsCenter 
						 	sliderRequired={false}  
							 title='Withdraw your staked PIGS' 
							 infoValue2="2% per day"
							 infoTitle='PIGS staked'
							infoValue='43PIGS'
							infoTitle2='Withdraw limit'
							infoTitle3='Available PIGS to withdraw'
							infoValue3='4.3PIGS'
							token='PIGS'
							icon={pig}
							pTitle="Enter amount of PIGS to be withdrawn from the PIG Pen"
						/>
						}
					</div>
				</div>

				{/* absolute */}
				<img className={styles.pig} src={pig} alt='' />
			</div>
		</div>
		
	)
}

export default PigsPen
