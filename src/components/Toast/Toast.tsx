import React from 'react'
import { useAppSelector } from 'state/hooks'
import styles from './Toast.module.scss'


function Toast() {

  const isToastOpen = useAppSelector((state)=>state.toggleReducer.isToastNotificationOpen)
  const msg = useAppSelector((state)=>state.toggleReducer.toastNotificationMsg)
  return (
    <div className={ isToastOpen ? `${styles.toast} ${styles.toast__active}` : `${styles.toast}` } >{msg}</div>
  )
}

export default Toast