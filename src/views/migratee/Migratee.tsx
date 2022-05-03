import React from 'react'
import styles from './Migratee.module.scss'
import pig from '../../assets/pigs.png'
import pigdog from '../../assets/dogg.png'

function Migrate() {
  return (
    <div className={styles.migrate}>
        <p className={styles.migratep} >PIGS Credit, Piggy Bank, and PIG Pen WILL ALL BE GOING LIVE THURSDAY MAY, 5TH.</p>
        <p className={styles.migratep2} >WE WILL THEN RELEASE INSTRUCTIONS ON DOGS CREDITING.</p>
        <p className={styles.migratep3} >`&The vast possibilities of our great future will become realities only if we make ourselves responsible for that future.`</p>
        <p className={styles.p4} >—Gifford Pinchot</p>
        <div>
            <img style={{marginRight:"20px"}} src={pig} alt="" />
            <img src={pigdog} alt="" />
        </div>
    </div>
  )
}

export default Migrate 