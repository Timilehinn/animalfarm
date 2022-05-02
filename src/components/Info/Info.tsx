import React from 'react'
import styles from './Info.module.scss'

interface infoProps {
    title : string,
    info : any
}

function Info({title,info}:infoProps) {
  return (
    <div className={styles.info} >
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{info}</p>
    </div>
  )
}

export default Info