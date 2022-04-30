import React from 'react'
import styles from './PigsCredit.module.scss'

interface cardProps {
  amount : string
}

function PigsCreditCard({amount}:cardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.total}>Pigs Balance</p>
      <p className={styles.value}>{amount} PIGS</p>
    </div>
  )
}

export default PigsCreditCard