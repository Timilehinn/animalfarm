import React from 'react'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { toggleModalBackDrop, toggleDepositModal, toggleGardenModal, toggleFaqModal } from 'state/toggle'
import { useConnectWalletModal } from 'state/wallet/hooks'
import styles from './ModalBackdrop.module.scss'

function ModalBackdrop() {
	const { isModalOpen, toggleConnectWalletModal } = useConnectWalletModal()
	const isBackDropOpen = useAppSelector((state) => state.toggleReducer.isModalBackDropOpen)
	const dispatch = useAppDispatch()

	const closeModal = () => {
		toggleConnectWalletModal(false)
		dispatch(toggleModalBackDrop(false))
		dispatch(toggleDepositModal(false))
		dispatch(toggleGardenModal(false))
		dispatch(toggleFaqModal(false))
	}

	return (
		<div onClick={() => closeModal()} className={isBackDropOpen ? `${styles.backdrop} ${styles.backdrop__active} ` : `${styles.backdrop}`}>
			ModalBackdrop
		</div>
	)
}

export default ModalBackdrop
