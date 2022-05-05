import React from 'react'
import styles from './PigsCredit.module.scss'

interface cardProps {
  amount :any
  title : string
}

function PigsCreditCard({amount,title}:cardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.total}>{title}</p>
      <p className={styles.value}>{amount}</p>
    </div>
  )
}

export default PigsCreditCard