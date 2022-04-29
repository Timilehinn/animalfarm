import React from 'react'
import { useSpring, animated } from 'react-spring'
import ClaimPigsPen from 'components/ClaimPigsPen/ClaimPigsPen'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import styles from './PigsCredit.module.scss'
import pig from '../../assets/pig.png'

function PigsCredit() {
	const [activeTab, setActiveTab] = React.useState(1)
	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })

	return (
		<animated.div style={props} className={styles.pigscredit__wrap}>
			<div className={styles.pigscredit}>
				<div className={styles.cards}>
					<div>
						<PigsCreditCard />
					</div>
					<div>
						<PigsCreditCard />
					</div>
				</div>
				<div className={styles.credit__wrap}>
					<div className={styles.tabs}>
						<div onClick={() => setActiveTab(1)} className={activeTab === 1 ? `${styles.tab__one} ${styles.tab__one__active}` : `${styles.tab__one}`}>
							<p>Claim to pig pens</p>
						</div>
						<div onClick={() => setActiveTab(2)} className={activeTab === 2 ? `${styles.tab__two} ${styles.tab__two__active}` : `${styles.tab__two}`}>
							<p>Claim to Piggy bank</p>
						</div>
					</div>
					{activeTab === 1 ? <ClaimPigsPen title='Submit Pigs' /> : <RewardsCenter xLock sliderRequired title='Submit PIGS/BUSD LP' />}
				</div>

				<img className={styles.pig} src={pig} alt='' />
			</div>
		</animated.div>
	
	)
} 

export default PigsCredit
