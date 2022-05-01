import React from 'react'
import styles from './Info.module.scss'

interface infoProps {
    title : string,
    info : any
}

function Info({title,info}:infoProps) {
  return (
    <div className={styles.info} >
        <p>{title}</p>
        <p>{info}</p>
    </div>
  )
}

export default Info