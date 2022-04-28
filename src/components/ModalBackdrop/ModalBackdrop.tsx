import React from 'react'
import styles from './ModalBackdrop.module.scss'
import { useConnectWalletModal,useConnectWallet } from '../../state/wallet/hooks'

function ModalBackdrop() {
  const { isModalOpen,toggleConnectWalletModal } = useConnectWalletModal()


  return (
    <div onClick={()=>toggleConnectWalletModal(false)} className={ isModalOpen ? `${styles.backdrop} ${styles.backdrop__active} ` : `${styles.backdrop}` } >ModalBackdrop</div>
  )
}

export default ModalBackdrop