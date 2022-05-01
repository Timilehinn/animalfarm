import React from 'react'
import { useAppSelector } from 'state/hooks'
import styles from './ModalBackdrop.module.scss'


function ModalBackdrop() {
  // const { isModalOpen,toggleConnectWalletModal } = useConnectWalletModal()
  const isBackDropOpen = useAppSelector((state)=>state.toggleReducer.isModalBackDropOpen)


  return (
    <div className={ isBackDropOpen ? `${styles.backdrop} ${styles.backdrop__active} ` : `${styles.backdrop}` } >ModalBackdrop</div>
  )
}

export default ModalBackdrop