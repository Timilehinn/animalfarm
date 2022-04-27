import React from 'react'

import ClaimPigsPen from 'components/ClaimPigsPen/ClaimPigsPen'
import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import styles from './PigsPen.module.scss'
import pig from '../../assets/pig.png'

function PigsPen() {

    const [ activeTab, setActiveTab ] = React.useState(1);

    return (
    <div className={styles.pigspen}>
        <div className={styles.credit__wrap} >
            <div className={styles.tabs}>
                <div onClick={()=>setActiveTab(1)} className={ activeTab === 1 ? `${styles.tab__one} ${styles.tab__one__active}` : `${styles.tab__one}` }>
                    <p>Deposit Pigs</p>
                </div>
                <div onClick={()=>setActiveTab(2)} className={  activeTab === 2 ? `${styles.tab__two} ${styles.tab__two__active}` : `${styles.tab__two}` }>
                    <p>Withdraw Pigs</p>
                </div>
            </div>
            {
				activeTab === 1 ? 
				<RewardsCenter sliderRequired = {false} title="Submit PIGS to be deposited" xLock={false}  />
				:
				<RewardsCenter sliderRequired = {false} title="Withdraw your staked PIGS"  />
			}  
        </div>
        
        {/* absolute */}
        <img className={styles.pig} src={pig} alt="" />
    </div>
  )
}

export default PigsPen