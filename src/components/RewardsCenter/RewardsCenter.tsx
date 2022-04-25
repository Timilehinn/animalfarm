import React from 'react'
import styles from './RewardsCenter.module.scss'

function RewardsCenter() {
  return (
    <div className={styles.reward} >
        <p className={styles.header} >Reward Center</p>
        <div className={styles.reward__claim} >
            <div style={{marginBottom:"20px"}} className={styles.reward__claim__box}>
                <p>Claimable BUSD</p>
                <p>0 BUSD</p>
            </div>
             <div className={styles.reward__claim__box}>
                <p>Lockup durarion</p>
                <p>0hours</p>
            </div>
        </div>
        <button>Claim BUSD</button>
    </div>
  )
}

export default RewardsCenter