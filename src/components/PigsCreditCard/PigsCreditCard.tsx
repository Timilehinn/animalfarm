import React from 'react'
import styles from './PigsCredit.module.scss'

function PigsCreditCard() {
  return (
    <div className={styles.card}>
        <p className={styles.total}>Total pigs deposited</p>
        <p className={styles.value}>1,648,4848</p>
    </div>
  )
}

export default PigsCreditCard