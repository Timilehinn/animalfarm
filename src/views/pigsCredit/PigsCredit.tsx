import React from 'react'
import ClaimPigsPen from 'components/ClaimPigsPen/ClaimPigsPen'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import styles from './PigsCredit.module.scss'

import pig from '../../assets/pig.png'


function PigsCredit() {

	const [ activeTab, setActiveTab ] = React.useState(1)

  return (
    <div className={styles.pigscredit} >
		<div className={styles.cards} >
			<div>
				<PigsCreditCard />
			</div>
			<div>
				<PigsCreditCard />
			</div>
			<div>
				<PigsCreditCard />
			</div>
		</div>
		<div className={styles.tabs}>
			<div onClick={()=>setActiveTab(1)} className={ activeTab === 1 ? `${styles.tab__one} ${styles.tab__one__active}` : `${styles.tab__one}` }>
				<p>Claim pig pens</p>
			</div>
			<div onClick={()=>setActiveTab(2)} className={  activeTab === 2 ? `${styles.tab__two} ${styles.tab__two__active}` : `${styles.tab__two}` }>
				<p>Claim Piggybank</p>
			</div>
		</div>
		<ClaimPigsPen />
    </div>
  )
}

export default PigsCredit